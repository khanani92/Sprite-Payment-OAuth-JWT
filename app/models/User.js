/**
 * Created by kodevz on 8/5/15.
 */
'use strict';

module.exports = function(app, db) {
  var _Schema = db.Schema,
    uniqueValidator = require('mongoose-unique-validator');


  var _UserSchema = new _Schema({
    firstName: {type:String},
    lastName: {type:String},
    emailAddress: {type:String, required:true, unique:true},
    block: {type:Boolean},
    pinCode: {type:String},
    verificationCode: {type:String},
    isVerified: {type: Boolean},
    sessionToken: {type: String},
    role : {type: String},
    created_at: {type:Date},
    last_login: {type:Date}
  });









  var _User = db.model('User', _UserSchema);
 // _User.plugin(uniqueValidator, { message: 'Error, Email match found' });
  app.db.User = _User;

};
