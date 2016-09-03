/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
if (Meteor.isClient) {
  var MAP_ZOOM = 15;

 Meteor.startup(function() {  
  GoogleMaps.load({
    key: 'AIzaSyD81kt-LoD3_Vqyqhd1yw9YlHq8J3SHpEg'
  });
});
}

Template.NotFound.events({
'click #logout': function(){
  Meteor.logout();
    document.location.reload(true);
}	
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.NotFound.helpers({
geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
  },
  map2Options: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.NotFound.onCreated(function () {
  
    GoogleMaps.ready('map', function(map) {

      google.maps.event.addListener(map.instance, 'click', function(event) {
        Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      });
    
      var markers = {};

      Markers.find().observe({
        added: function (document) {
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,
            id: document._id
          });

          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
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
Template.NotFound.onRendered(function () {
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

Template.NotFound.onDestroyed(function () {
});
