    Friends = new Meteor.Collection('friends');
    Requests = new Meteor.Collection('requests');
    
Meteor.startup(function(){
    
  if(Meteor.isClient) {
      navigator.contacts.find();
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
       /**
       var ayudaContactos = {
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
    }
    */
     if (Meteor.isCordova) {
    TelephoneNumber.get(function(result) {
        alert('Phone number: ' + result.line1Number);
      }, function() {
        alert('Error. Do the phone have this feature? (Settings > About Phone > SIM > Number)');
      });
       }
      });
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
  
Meteor.methods({
'removeFriend': function(selector){
    Friends.remove(selector);
    },
'removeFriendCompletely': function(selector2){
    Friends.remove(selector2);
    }
});
}

/**
Start of maps
 */

if (Meteor.isClient) {
  var MAP_ZOOM = 15;


  Template.first.onCreated(function() {
    var self = this;

    GoogleMaps.ready('first', function(firstmap) {
      var firstmarker;

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! firstmarker) {
          firstmarker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: firstmap.instance
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          firstmarker.setPosition(latLng);
        }

        // Center and zoom the map view onto the current position.
        //firstmap.instance.setCenter(firstmarker.getPosition());
        firstmap.instance.setZoom(MAP_ZOOM);
      });
    });
  });

  Template.first.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    firstOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });
}

