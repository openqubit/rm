    Friends = new Meteor.Collection('friends');
    Requests = new Meteor.Collection('requests');
    Markers = new Meteor.Collection('markers');
    
Meteor.startup(function(){
Markers._ensureIndex({createdAt: 1}, {expireAfterSeconds: 60});
  if(Meteor.isClient) {
      console.log('hello');
    GoogleMaps.load({
    key: 'AIzaSyD81kt-LoD3_Vqyqhd1yw9YlHq8J3SHpEg'
    });
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





if (Meteor.isClient) {
  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      google.maps.event.addListener(map.instance, 'click', function(event) {
        var ln = localStorage.getItem("lastname");
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location;
            var url = toString(url);
       var lastSegment = url.split('/').pop();
        //alert("the cors iframe bridge parameter is  "+lastSegment);
        var myApp = new Framework7();
 
        var $$ = Dom7;
        
       myApp.confirm(
      '<label>Event Title</label><br/><br/>'+
       '<input type="text" id="eventtitle" value="" /> <br/><br/>'+
      '<label>Event Time</label><br/><br/>'+
       '<input type="time" id="eventtime" value="" /> <br/><br/>'+
       '<label>Event Duration</label><br/><br/>'+
       '<input type="number" id="eventduration" value="" /> <br/><br/>'+
       '<label>Event Category</label><br/><br/>'+
        '<select id="eventcategory" name="category">'+
            '<option value="hackathon">Hackathon</option>'+
              '<option value="birthday">Birthday</option>'+
              '<option value="bar">Bar Mitzvah</option>'+
            '</select><br/><br/>'+
            '<label>Event Owner</label><br/><br/>'+
            '<select id="eventowner" name="owner">'+
            '<option value="3">Me</option>'+
              '<option value="4">Other</option>'+
            '</select>', 'Geo Canada Create Event',
      function () {
         var ec = $('#eventcategory').val();
        var eo = $('#eventowner').val();
        Markers.insert({ createdAt: new Date(),lat: event.latLng.lat(), lng: event.latLng.lng(), eventowner:eo, eventcategory: ec});
      },
      function () {
       
      }
      );
      });

      var markers = {};

      Markers.find().observe({
        added: function (document) {
          var icon;
              if(document.eventowner == '3'){
                var icon = 'http://maps.google.com/mapfiles/kml/shapes/hospitals.png';
              }
              else{
                var icon = 'http://maps.google.com/mapfiles/kml/shapes/snowflake_simple.png';
              }
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,
            id: document._id,
            icon: icon
          });

          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          });
          
          var infoWindow = new google.maps.InfoWindow({
                content: "Fancy html goes here"
            });
          
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map.instance, marker);
            });
            
          markers[document._id] = marker;
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      });
    });
  });

if (Meteor.isClient) {
  Meteor.startup(function() {
    console.log('hello');
    GoogleMaps.load({
    key: 'AIzaSyD81kt-LoD3_Vqyqhd1yw9YlHq8J3SHpEg'
    });
  });
}


  Template.map.helpers({
    mapOptions: function() {
      latLng = Geolocation.latLng();
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: 8
        };
      }
    }
  });
}

