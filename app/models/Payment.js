/**
 * Created by muddassir on 18/12/15.
 */
'use strict';

module.exports = function(app, db) {
  var _Schema = db.Schema;


  var _PaymentSchema = new _Schema({
    user_id: {type:String},
    card: {type:String},
    amount: {type:Number},
    currency: {type:String},
    created_at: {type:Date}
  });


  var _Payment = db.model('Payment', _PaymentSchema);
  // _User.plugin(uniqueValidator, { message: 'Error, Email match found' });
  app.db.Payment = _Payment;

};
