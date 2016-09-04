
if (Meteor.isClient) {
  
   Template.map.events({
  'click .kr': function (event,template) {
   event.preventDefault();
   alert('this connected!');
  }
   });

  Template.map.onCreated(function() {
   

  });


  Template.map.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });
  
 

Template.map.onRendered(function() {

});
}


