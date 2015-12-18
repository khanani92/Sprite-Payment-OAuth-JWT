
'use strict';
module.exports = function(app) {

  //app.controllers._doSignIn = function(req,res){
  //  res.send("Doing Login");
  //}
  var Bcrypt = require('bcrypt-nodejs'),
    Q = require('q'),
    User = app.db.User;



  app.controllers._welcome = function(req, res) {
    res.json({
      data: {
        message: 'Welcome!'
      }
    });
  };

  // Create endpoint /api/users for POST
  app.controllers._registerUsers = function(req, res) {
    var _registrationData = req.body,
      _time = new Date(),
      _randomNumber = '',
      _possibleValues = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()abcdefghijklmnopqrstuvwxyz' + _time.getTime(),
      _noreplyEmail= 'hivewiretest@gmail.com',
      _userEmail = _registrationData.emailAddress;
    console.log(_registrationData);
    if(_registrationData.emailAddress)
    {
      //It will generate a random number for verification
      for(var i=0; i< 6; i++) {
        _randomNumber += _possibleValues.charAt(Math.floor(Math.random() * _possibleValues.length));
      }

      //Encryption of registration data
      app.services.encrypt(_registrationData.emailAddress,function(emailAddress) {
        var _emailAddress = emailAddress.content;
        app.services.encrypt(_registrationData.pinCode, function (pinCode) {
          var _pinCode = pinCode.content;

          var register_info = new User({
            emailAddress: _emailAddress,
            block: false,
            pinCode: _pinCode,
            verificationCode: _randomNumber,
            isVerified: false,
            sessionToken: '',
            created_at: new Date()
          });

          register_info.save(function (error, data) {
            if (error) {
              res.send({
                code: 400,
                content: 'Bad Request',
                msg: 'Email match found'
              });
            }
            else
              res.send({
                code: 200,
                content: 'OK',
                msg: 'User Registered'
              });
          });
        });
      });
    }
    else{
      res.send({
        code : 404 ,
        content : 'Not Found',
        msg : 'Missing Credentials'
      });
    }
  };



  app.controllers._login = function(req, res) {
    var _pinEmail = req.body.emailAddress,
      _pinCode = req.body.pinCode;

    if(_pinEmail && _pinCode) {

      app.services.encrypt(_pinEmail,function(userEmail){
        var _encryptEmailAddress  = userEmail.content;
        app.services.encrypt(_pinCode,function(pinCode){
          var _encryptPinCode  = pinCode.content;

          User.find({emailAddress: _encryptEmailAddress, pinCode: _encryptPinCode}, function (err, user) {
            if (err) {
              res.send({
                code: 500,
                content : 'Internal Server Error',
                msg: 'API not called properly'
              });
            }
            else if (user!='') {
              if(user[0]._doc.block == false){

                if(user[0]._doc.isVerified == true)
                {
                  /*Delete old Token*/
                  delete user[0]._doc.sessionToken;
                  user[0]._doc.__timeStamp = new Date();
                  // create a token
                  var token = jwt.sign(user, "spritesampleapp", {
                    expiresInMinutes: 180 // expires in 3 hours
                  });
                  User.update({"emailAddress": _encryptEmailAddress}, {

                    "sessionToken": token

                  }, function () {
                    res.send({
                      code: 200,
                      content : 'OK',
                      msg: 'Authentication Successful',
                      token : token
                    });
                  });
                }
                else{
                  res.send({
                    code: 400,
                    content : 'Bad Request',
                    msg: 'User not verified'
                  });
                }
              }
              else{
                res.send({
                  code: 400 ,
                  content : 'Bad Request',
                  msg: 'Your account is blocked, please contact admin'
                });
              }
            }
            else {
              res.send({
                code: 404,
                content : 'Not Found',
                msg: 'Email Address or PIN not correct'
              });
            }
          });
        })
      })
    }
    else{
      res.send({
        code : 404,
        content : 'Not Found',
        msg : 'Missing Credentials'
      });
    }
  }
};
