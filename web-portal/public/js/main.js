localStorage.clear();
var _domainAPI = "https://sprite-sample.herokuapp.com/",
  _domainWeb = "https://sprite-sample-web.firebaseapp.comUse a Custom Domain";
$(document).ready(function() {
 var a = 0
function loginSubmit() {

    $.blockUI({ css: {
      border: 'none',
      padding: '15px',
      backgroundColor: '#000',
      '-webkit-border-radius': '10px',
      '-moz-border-radius': '10px',
      opacity: .5,
      color: '#fff'
    } });


  var url = _domainWeb + 'dashboard';
  var email = document.getElementById('email').value;
  var user_pass = document.getElementById('password').value;
  var dataObject = {
    "email" : email,
    "password" : user_pass

  };
  $.ajax({
    method: "POST",
    url: _domainAPI + "api/login",
    data: dataObject
  }).done(function(data) {
    console.log(data);
    if(data.code == 200){
      console.log(data);
      $.unblockUI();
      localStorage.setItem('sessionToken',data.token);
      localStorage.setItem('emailAddress',email);
      localStorage.setItem('lastLogin',data.last_login);
      window.location = url;
    }
    else{
      $.unblockUI();
      console.log('email/Password incorrect' + data.code);
    }
  });
}

function registerSubmit() {


  $.blockUI({ css: {
    border: 'none',
    padding: '15px',
    backgroundColor: '#000',
    '-webkit-border-radius': '10px',
    '-moz-border-radius': '10px',
    opacity: .5,
    color: '#fff'
  } });

  var url = _domainWeb + 'dashboard';
  var email = document.getElementById('emailr').value;
  var user_pass = document.getElementById('passwordr').value;
  var dataObject = {
    "email" : email,
    "password" : user_pass
  };
  $.ajax({
    method: "POST",
    url: _domainAPI + "api/register",
    data: dataObject
  }).done(function(data) {
    console.log(data);
    if(data.code == 200){
      console.log(data);
      $.unblockUI();
      localStorage.setItem('sessionToken',data.token);
      localStorage.setItem('emailAddress',email);
      localStorage.setItem('lastLogin',data.last_login);
      window.location = url;
    }
    else{
      $.unblockUI();
      console.log('email/Password incorrect' + data.code);
    }
  });
}

  function openForm(){
    if(a == 0){
      $('.form1').hide();
      $('.form2').show();
      a = !a;
    }else{
      $('.form2').hide();
      $('.form1').show();
    }
  }
document.getElementById("loginSubmit").addEventListener("click", loginSubmit, false);
document.getElementById("registerSubmit").addEventListener("click", registerSubmit, false);
document.getElementById("signUp").addEventListener("click", openForm, false);
document.getElementById("signIn").addEventListener("click", openForm, false);
});
