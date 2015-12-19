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
    app.services.encrypt(_paymentData.amount,function(amount){
      var _amount  = amount.content;
      app.services.encrypt(_paymentData.currency,function(currency){
        var _currency  = currency.content;
        app.services.encrypt(_paymentData.emailAddress,function(emailAddress) {
          var _emailAddress = emailAddress.content;
          app.services.encrypt(_paymentData.card_info,function(card_info) {
            var _card_info = card_info.content;

            stripe.charges.create({
                card: _card_info,
                currency: _currency,
                amount: _amount
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
                    user_email: _emailAddress,
                    card: _card_info,
                    amount: _amount,
                    currency: _currency,
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
          });
        });
      });
    });
  };
};
