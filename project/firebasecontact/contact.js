// Initialize Firebase
var config = {
    apiKey: "AIzaSyA84yoqTzNDuK2XXMOX37xlXLTtZF8BQ1M",
    authDomain: "fyp-contactus.firebaseapp.com",
    databaseURL: "https://fyp-contactus.firebaseio.com",
    projectId: "fyp-contactus",
    storageBucket: "",
    messagingSenderId: "184430605973"
  };
  firebase.initializeApp(config);

//   firebase refrences
var refMessage=firebase.database().ref('UserData')

//   Submit Form
document.getElementById('contactForm').addEventListener('submit',submitForm);
 
function submitForm(ele){
ele.preventDefault();

// Input values
var op=document.getElementById('reason')
var reason=op.options[op.selectedIndex].text;
var firstName=getInputValue('fname');
var lastName=getInputValue('lname');
var email=getInputValue('email');
var phone=getInputValue('phone');
var subject=getInputValue('subject');
var comments=getInputValue('message');


// save Data
saveData(firstName,lastName,email,phone,subject,comments,reason)


// Show  message sent alert
document.querySelector('.alert').style.display='block';
// Hide alert
setTimeout(function(){
    document.querySelector('.alert').style.display='none';
},5000)

// clear form
document.getElementById('contactForm').reset();
}

// get form values
function getInputValue(id){
return document.getElementById(id).value;
}


//save user data to firebase
 function saveData(firstName,lastName,email,phone,subject,comments,reason){
var newMessage=refMessage.push();
newMessage.set({
    firstName:firstName,
    lastName:lastName,
    email:email,
    phone:phone,
    subject:subject,
    comments:comments,
    reason:reason

})
 } 

 function clear(){
     document.getElementById('contactForm').reset();
 }
 window.onload=clear;

 // menu collapse 
$(document).click(function(e) {
	if (!$(e.target).is('.navbar-collapse collapse in')) {
    	$('.collapse').collapse('hide');	    
    }
});