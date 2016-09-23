    Friends = new Meteor.Collection('friends');
    Requests = new Meteor.Collection('requests');
    
Meteor.startup(function(){
    navigator.contacts.find()
  if(Meteor.isClient) {
    console.log(navigator.contacts.find());
  }
});

if(Meteor.isCordova) {
var options = new ContactFindOptions();
options.filter = "";
options.multiple = true;
var fields = ["displayName", "name"];
vm.contacts = navigator.contacts.find(fields, onSuccess, onError, options);

function onSuccess(contacts) {
  console.log(contacts.length + 'contacts');
  for (var i = 0; i < contacts.length; i++) {
    console.log("Display Name = " + contacts[i].displayName);
  }
}

function onError(contactError) {
  console.log('onError!');
}
}

if(Meteor.isClient) {
    /**
    Router.route('/',function(){
        console.log('landing page is loaded');
        latLng = Geolocation.latLng();
        var userid = Meteor.userId();
        window.location = '/' + latLng.lat + '/' + latLng.lng + '/' + userid;
    });
    */
}

if(Meteor.isServer){
    
    Meteor.methods({
    'allfb' : function(){
        /**
    this.unblock();
   var user = Meteor.user();
   if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
        var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');

        console.log(result.data.first_name);
        console.log(result.data.last_name);
        console.log(result.data.birthday);
        console.log(result.data.email);
        console.log(result.data.gender);
        console.log(result.data.location);
        console.log(result.data.link);
        console.log(result.data.friends);
     }
    }
    */
    }
     });
     

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
      /**
   event.preventDefault();
   var user = Meteor.user();
   if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')) {
 $.getJson      
$.getJSON('https://graph.facebook.com/me/friends?limit=100&access_token=' + user.services.facebook.accessToken, function(mydata) {
       console.log('we are in');
        for (var i in mydata.data) {
            console.log(mydata.data[i].name);
        }
     });
  }
   Meteor.call('allfb');
   
     
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
   */
  },
  'click .rf': function (event,template) {
      /**
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
            */
  },
  'click #doRefresh': function (event,template) {
      /**
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
       */
  }
   });
   Template.registerHelper('equals', function (a, b) {
      return a === b;
    });
    /**
    Template.au.helpers({
    allusers: function() {
    return Meteor.users.find();
   },
 isFriend: function() {
     /**
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
           */
   
 Template.logout.events({
'click #logout': function(){
    /*
  Meteor.logout();
    document.location.reload(true);
    */
}	
});


  Template.logout.onCreated(function() {

  });
Template.au.helpers({
  contactos: function () {
    return Session.get("contactos");
  },
  tituloNav: "Invitar amigos"
});

Template.au.rendered = function () {
    var ayudaContactos = [
    if(Meteor.isCordova){
      function onSuccess(contacts){
        console.log(contacts);
        contacts = _.sortBy(contacts, function(o) { return o.name.givenName; })
        Session.set("contactos",contacts);
      };
      function onError(contactError){
        Session.set("contactos","");
      };
      var options = new ContactFindOptions();
      options.multiple = true;
      var fields       = ["displayName", "name"];
      var contactos = navigator.contacts.find(fields, onSuccess, onError, options);
    }else{
      Session.set("contactos", ayudaContactos);
    }

    
};
}

Meteor.methods({
'removeFriend': function(selector){
    Friends.remove(selector);
    },
'removeFriendCompletely': function(selector2){
    Friends.remove(selector2);
    }
});
