window.onload= function(){
  firebase.auth().onAuthStateChanged(user =>{
    if(user){
      // console.log(user.uid);
      // localStorage.setItem("userId",user.uid);
      // document.getElementById("auth-div").innerHTML=`<button onclick='onSignOut()'>signout</button>`
      // document.getElementById("recaptcha-container").style.display="none";
      if(localStorage.getItem("userId")){
        localStorage.removeItem("userId")
        onSignOut();
      }
      else{
        localStorage.setItem("userId",user.uid);
        window.location.replace("./user-form.html");
        
      }
      
      // console.log('in user');
    }
    
  })
 
}
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    console.log(response);
    console.log("in recaptcha");
    document.getElementById("sign-in-button").disabled=false;
  }
});
recaptchaVerifier.render().then(function(widgetId) {
  window.recaptchaWidgetId = widgetId;
});

  function onSignInSubmit(){
      console.log("on sign in submit")
    var phoneNumber = getPhoneNumberFromUserInput();
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          document.getElementById("recaptcha-container").style.display="none";
          document.getElementById("auth-div").innerHTML=`
          <input class=input id="verif-code-input" type="text" />
          <button class=input id="verify-btn" onclick="onSubmitOfVerifCode()">verify</button>`;
        }).catch(function (error) {
          // Error; SMS not sent
          console.log(error);
          // ...
        });
  }
  function getPhoneNumberFromUserInput(){
      let value = document.getElementById("phone-number-input").value;
      return value;

  }
  function onSubmitOfVerifCode(){
    var code = getCodeFromUserInput();
    confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  function getCodeFromUserInput(){
      let value= document.getElementById("verif-code-input").value;
      return value;
  }
  function onSignOut(){
    firebase.auth().signOut();

  }