Template.map.rendered = function(){
	Map.initialize("map_canvas");
	if(Meteor.isCordova){
		alert(Geolocation.currentLocation());
	}
};
