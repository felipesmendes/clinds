Club = new Mongo.Collection("clubs");
if (Meteor.isClient) {
  
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  Template.hello.rendered = function(){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
    var mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);
    
    //Minha posicao
    var gLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                      var gMarker = new google.maps.Marker({
                      position: gLatLng,
                      map: map,
                      animation: google.maps.Animation.DROP,
                      icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                      });
         var markers = Club.find({location: {$near:[position.coords.latitude,position.coords.longitude],$maxDistance: 0.02}}).fetch();
         Deps.autorun(function() {
                _.each(markers, function(page) {  
        console.log("criou");               
                      var gLatLng = new google.maps.LatLng(page.location.latitude, page.location.longitude);
                      var gMarker = new google.maps.Marker({
                      position: gLatLng,
                      map: map,
                      animation: google.maps.Animation.DROP,
                      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                      });
                    });

                });
      }, function(){
        alert("erro geolocation");
      });
             


};
}
if (Meteor.isCordova) { 
  Template.hello.rendered = function(){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
    var mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);
    
    //Minha posicao
    var gLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                      var gMarker = new google.maps.Marker({
                      position: gLatLng,
                      map: map,
                      animation: google.maps.Animation.DROP,
                      icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                      });
         var markers = Club.find({location: {$near:[position.coords.latitude,position.coords.longitude],$maxDistance: 0.02}}).fetch();
         Deps.autorun(function() {
                _.each(markers, function(page) {  
        console.log("criou");               
                      var gLatLng = new google.maps.LatLng(page.location.latitude, page.location.longitude);
                      var gMarker = new google.maps.Marker({
                      position: gLatLng,
                      map: map,
                      animation: google.maps.Animation.DROP,
                      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                      });
                    });

                });
      }, function(){
        alert("erro geolocation");
      });
             }
  Meteor.startup(function () {
    var onSuccess = function(position) {
      console.log("chamou a função de sucesso");
      alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }
    console.log("Vai chamar o navigator");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });
  console.log("Printed only in mobile cordova apps");

}

if (Meteor.isServer) {

}
