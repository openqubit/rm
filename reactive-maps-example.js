    Friends = new Meteor.Collection('friends');
    Requests = new Meteor.Collection('requests');
    
if(Meteor.isClient) {
    Router.route('/',function(){
        console.log('landing page is loaded');
        var latLng = Geolocation.latLng();
        window.location = '/' + latLng.lat + '/' + latLng.lng;
    });
}

if(Meteor.isServer){

    Meteor.publish("friends", function () {
           return Friends.find();
    });
     Meteor.publish("requests", function () {
           return Requests.find();
    });
     Meteor.publish("users", function () {
           return Meteor.users.find();
    });
    Meteor.startup(function() {  
        if (Friends.find().count() === 0) {
  Friends.insert({userid:0,friendid:0});
  }
  if (Requests.find().count() === 0) {
  Requests.insert({userid:0,friendid:0});
  }
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
}
if (Meteor.isClient) {
  Meteor.subscribe("users");
  Meteor.subscribe("friends");
  Meteor.subscribe("requests");
   Template.lenav.events({
  'click .kr': function (event,template) {
   event.preventDefault();
    console.log('lenav');
  }
   });
   Template.au.onRendered(function () {
       $('td:nth-child(1)').hide();
      });
    Template.au.events({
  'click .af': function (event,template) {
   event.preventDefault();
    function freshRender(){
        $('.table > tbody > tr').each(function() {
       var friendid = $(this).find("td:first").html();
       var userid = Meteor.userId();
       var selector = {
            "userid": userid,
            "friendid":friendid
            };
           var this_exists = Friends.find(selector, {limit: 1}).count() > 0;
           if(this_exists == true) {
          $("#"+friendid).html('');
          $("#"+friendid).append("<button id='"+friendid+"' class='rf btn btn-danger'>Remove Friend</button>");
           } else {
         $("#"+friendid).html('');
         $("#"+friendid).append("<button id='"+friendid+"' class='af btn btn-primary'>Add Friend</button>");
           }
       });
   }
   var friendid = event.target.id;
   var userid = Meteor.userId();
   Friends.insert({userid:userid,friendid:friendid});
   Friends.insert({userid:friendid,friendid:userid});
   //$('.'+friendid).remove();
   //$('.'+userid).remove();
   freshRender();
  },
  'click .rf': function (event,template) {
   event.preventDefault();
    function freshRender(){
        $('.table > tbody > tr').each(function() {
       var friendid = $(this).find("td:first").html();
       var userid = Meteor.userId();
       var selector = {
            "userid": userid,
            "friendid":friendid
            };
           var this_exists = Friends.find(selector, {limit: 1}).count() > 0;
           if(this_exists == true) {
          $("#"+friendid).html('');
          $("#"+friendid).append("<button id='"+friendid+"' class='rf btn btn-danger'>Remove Friend</button>");
           } else {
         $("#"+friendid).html('');
         $("#"+friendid).append("<button id='"+friendid+"' class='af btn btn-primary'>Add Friend</button>");
           }
       });
   }
   var friendid = event.target.id;
   var userid = Meteor.userId();
    var selector = {
            "userid": userid,
            "friendid":friendid
            };
            
     var selector2 = {
            "userid": friendid,
            "friendid":userid
            };
            Meteor.call('removeFriend',selector);
            Meteor.call('removeFriendCompletely',selector2);
            freshRender();
  },
  'click #doRefresh': function (event,template) {
   event.preventDefault();
  
   $('.table > tbody > tr').each(function() {
       var friendid = $(this).find("td:first").html();
       var userid = Meteor.userId();
       var selector = {
            "userid": userid,
            "friendid":friendid
            };
           var this_exists = Friends.find(selector, {limit: 1}).count() > 0;
           if(this_exists == true) {
          $("#"+friendid).html('');
          $("#"+friendid).append("<button id='"+friendid+"' class='rf btn btn-danger'>Remove Friend</button>");
           } else {
         $("#"+friendid).html('');
         $("#"+friendid).append("<button id='"+friendid+"' class='af btn btn-primary'>Add Friend</button>");
           }
       });
  }
   });
   Template.registerHelper('equals', function (a, b) {
      return a === b;
    });
    
    Template.au.helpers({
    allusers: function() {
    return Meteor.users.find();
   },
 isFriend: function() {
 var userid = event.target.id;
 var cuserid = Meteor.userId();
 
 var selector = {
            "userid": cuserid,
            "friendid":userid
            };

           var this_exists = Friends.find(selector, {limit: 1}).count() > 0;
           if(this_exists == true) {
           return '44';
           } else {
        return '45';
           }
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

Meteor.methods({
'removeFriend': function(selector){
    Friends.remove(selector);
    },
'removeFriendCompletely': function(selector2){
    Friends.remove(selector2);
    }
});
