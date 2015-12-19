/**
 * Created by muddassir on 18/12/15.
 */
'use strict';
module.exports = function(app) {
  var Payment = app.db.Payment;
  var stripe = require("stripe")(
    app.getKey('test')
  );

  app.controllers._doPayment = function(req, res) {
    var _paymentData = req.body;

    stripe.charges.create({
        currency: _paymentData.currency,
        amount: _paymentData.amount,
        source: _paymentData.cardToken,
        description: "Charge for test@example.com"
      },
      function (err, charge) {
        if (err) {
          res.send({
            code: 500,
            content: 'Internal Server error',
            msg: err
          });
        }
        else {
          var payment_info = new Payment({
            user_email: _paymentData.emailAddress,
            source: _paymentData.cardToken,
            currency: _paymentData.currency,
            amount: _paymentData.amount,
            created_at: new Date()
          });

          payment_info.save(function (error,data) {
            if (error) {
              res.send({
                code: 400,
                content: 'Bad Request',
                msg: 'Payment Info not saved in DB'
              });
            }
            else{
              res.send({
                code: 200,
                content: 'OK',
                msg: 'Payment Proceeded Successfully',
                data:data
              });
            }
          });
        }
      });
  };
};
