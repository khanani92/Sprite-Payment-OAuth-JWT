'use strict';

module.exports = function(db){
  db.connect('mongodb://admin:admin@ds041603.mongolab.com:41603/stripe-sample');


  db.connection.on('connected', function () {
    console.log('Mongoose default connection open to ');
  });

  // If the connection throws an error
  db.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  db.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });
};

