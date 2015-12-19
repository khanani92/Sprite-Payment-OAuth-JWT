$(document).ready(function() {
  Stripe.setPublishableKey('pk_test_4yFQUoydLe02QbJxpT4cQYyS');

  //$.blockUI({ css: {
  //  border: 'none',
  //  padding: '15px',
  //  backgroundColor: '#000',
  //  '-webkit-border-radius': '10px',
  //  '-moz-border-radius': '10px',
  //  opacity: .5,
  //  color: '#fff'
  //} });

  var inputvalue = localStorage.getItem("lastLogin");
  inputvalue = new Date(inputvalue);
  $('#lastLoginID').html(inputvalue.getDate() + '/' + (inputvalue.getMonth()+1) + '/' + inputvalue.getFullYear() + ' ' + inputvalue.getHours() + ':' + inputvalue.getMinutes() + ':' + inputvalue.getSeconds());
});

var _domain = "https://sprite-sample.herokuapp.com/",
  _emailAddress = localStorage.getItem("emailAddress"),
  _token = localStorage.getItem("sessionToken");

var credentials = {
  "emailAddress" : _emailAddress,
  "token": _token
};

//
function pay() {
console.log(credentials)
  function stripeResponseHandler(status, response) {

    credentials.cardToken = response.id;
    credentials.amount = 100;
    credentials.currency = 'usd';
    $.ajax({
      method: "POST",
      url: _domain + "api/doPayment",
      data: credentials
    }).done(function(data) {
      console.log(data);
      if (data.code == 200) {
        //Token is not expired
        console.log(data);
        alert(data)


      }
      else {
        console.log('Error in fetching users data from db');
        alert(data)
      }
    });
  }
  Stripe.card.createToken({
    number: '4242424242424242',
    cvc: '1234',
    exp_month: '12',
    exp_year: '2016'
  }, stripeResponseHandler);



}

document.getElementById("paySubmit").addEventListener("click", pay, false);
