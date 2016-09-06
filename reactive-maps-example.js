

if (Meteor.isClient) {
  
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

  Template.map.onCreated(function() {

  });

  
 

Template.map.onRendered(function() {

});
}

