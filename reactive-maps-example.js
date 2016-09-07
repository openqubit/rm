

if (Meteor.isClient) {
  
  Meteor.startup(function() {  
  Accounts.loginServiceConfiguration.remove({
  service: "facebook"
});
Accounts.loginServiceConfiguration.insert({
  service: "facebook",
  appId: "1369489926397936",
  secret: "46de773cd67bc126265a82c92486b99b"
});

// first, remove configuration entry in case service is already configured
Accounts.loginServiceConfiguration.remove({
  service: "twitter"
});
Accounts.loginServiceConfiguration.insert({
  service: "twitter",
  consumerKey: "IYg2CZyDusOuxz3OUr6c3Ag0Y",
  secret: "euWmLsgkf6czv9ih8mK50EHUlO5S8NbekDayd0dON2kY24RElC"
});

// first, remove configuration entry in case service is already configured
Accounts.loginServiceConfiguration.remove({
  service: "google"
});
Accounts.loginServiceConfiguration.insert({
  service: "google",
  clientId: "291832390597-iblfe4fqvmcl1qbsfttj7m04093848h1.apps.googleusercontent.com",
  secret: "gDZUPq6XfLMC-RqjkbOT1jov"
});
  });
  
   Template.lenav.events({
  'click .kr': function (event,template) {
   event.preventDefault();
   alert('hello');
  }
   });
 Template.logout.events({
'click #logout': function(){
  Meteor.logout();
    document.location.reload(true);
}	
});

  Template.logout.onCreated(function() {

  });

Template.logout.onRendered(function () {
var myApp = new Framework7();
 
var $$ = Dom7;
 
  myApp.modal({
    title:  'GeoCanada Login Service',
    text: 'Login With Any Of The Methods Provided',
    verticalButtons: true,
    buttons: [
      {
      	title: 'Google',
        text: '<i class="fa fa-google" aria-hidden="true"> Google</i>',
        onClick: function() {
          Meteor.loginWithGoogle({
        requestPermissions: ['email']
       }, function(error) {
      if (error) {
    console.log(error); //If there is any error, will get error here
    document.location.reload(true);
     }else{
    console.log(Meteor.user());// If there is successful login, you will get login details here
     }
     });
        }
      },
      {
      	title: 'Facebook',
        text: '<i class="fa fa-facebook-official" aria-hidden="true"> Facebook</i>',
        onClick: function() {
           Meteor.loginWithFacebook({
        requestPermissions: ['email']
       }, function(error) {
      if (error) {
    console.log(error); //If there is any error, will get error here
    document.location.reload(true);
     }else{
    console.log(Meteor.user());// If there is successful login, you will get login details here
     }
     });
        }
      },
      {
      	title: 'Twitter',
        text: '<i class="fa fa-twitter-square" aria-hidden="true"> Twitter</i>',
        onClick: function() {
          Meteor.loginWithTwitter({
        requestPermissions: ['email']
       }, function(error) {
      if (error) {
    console.log(error); //If there is any error, will get error here
    document.location.reload(true);
     }else{
    console.log(Meteor.user());// If there is successful login, you will get login details here
     }
     });
        }
      }
    ]
  })

});
}

