$(document).ready(function() {
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

$.ajax({
  method: "POST",
  url: _domain + "api/checkExpiry",
  data: credentials
}).done(function(data) {
  console.log(data);
  if (data.code == 200) {
    //Token is not expired
    $.unblockUI();
  }
  else {
    window.location = _domain + 'admin';

  }
});

//
function pay() {
  var card = document.getElementById('card').value;
  var amount = document.getElementById('amount').value;
  $(document).ready(function() {
    $.blockUI({ css: {
      border: 'none',
      padding: '15px',
      backgroundColor: '#000',
      '-webkit-border-radius': '10px',
      '-moz-border-radius': '10px',
      opacity: .5,
      color: '#fff'
    } });
  });

  $.ajax({
    method: "POST",
    url: _domain + "api/checkExpiry",
    data: credentials
  }).done(function(data) {
    console.log(data);
    if (data.code == 200) {
      //Token is not expired
      console.log(data);
      $.unblockUI();


    }
    else {
      console.log('Error in fetching users data from db');
      $.unblockUI();
    }
  });

}

document.getElementById("paySubmit").addEventListener("click", pay, false);
