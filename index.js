Friends = new Meteor.Collection('friends');
Requests = new Meteor.Collection('requests');
Markers = new Meteor.Collection('markers');
    
Meteor.startup(function(){
if(Meteor.isServer) {
Markers._ensureIndex({createdAt: 1}, {expireAfterSeconds: 60});
    if (Friends.find().count() === 0) {
  Friends.insert({userid:0,friendid:0});
  }
  if (Requests.find().count() === 0) {
  Requests.insert({userid:0,friendid:0});
  }
}
  if(Meteor.isClient) {  
      console.log('hello');
    GoogleMaps.load({
    key: 'AIzaSyD81kt-LoD3_Vqyqhd1yw9YlHq8J3SHpEg'
    });
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
    alert("Display Name = " + contacts[i].displayName);
  }
}

function onError(contactError) {
  console.log('onError!');
}
}

if(Meteor.isServer){
    Meteor.publish("friends", function () {
           return Friends.find();
    });
     Meteor.publish("markers", function () {
           return Markers.find();
    });
     Meteor.publish("requests", function () {
           return Requests.find();
    });
     Meteor.publish("users", function () {
           return Meteor.users.find();
    });
}
if (Meteor.isClient) {
  
  Meteor.subscribe("users");
   Meteor.subscribe("markers");
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


