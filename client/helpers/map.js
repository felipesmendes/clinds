Template.map.rendered = function(){
	if(Meteor.isCordova){
			Map.initialize("map_canvas");
		alert(Geolocation.currentLocation());
	}
	if(Meteor.isClient){
	 	if (navigator.geolocation) {
        	navigator.geolocation.watchPosition(function(position){
        		var mapOptions = { 
        			center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        			zoom: 16,
            		mapTypeId: google.maps.MapTypeId.HYBRID
            	};
        		Map.initialize("map_canvas",mapOptions);
        		Map.addMarker({lat:position.coords.latitude, lng:position.coords.longitude});
				Tracker.autorun(function () {        		
	        		var clubs = Club.find({loc: {$near:[position.coords.latitude,position.coords.longitude],$maxDistance: 0.08}}).fetch();
	        		_.each(clubs,function(club){
	        			var latlng = new google.maps.LatLng(club.loc[0], club.loc[1]);
	        			console.log(club);
	        			var infowindow = '<h5>'+club.nome+'</h5><br/>Funcionamento<br/>'+club.dias.join(",")+'De '+club.abertura+' até '+club.fechamento+'<address><strong>'+club.nome+'</strong><br>'+club.endereco+'<br></address>';
	        			Map.addMarkerCustom(latlng,infowindow,'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',true);
	        		});
        		});
        	});
     	} else {
	        alert("Geolocation is not supported by this browser.");
	    }
	}
};

Template.map.helpers({
	clubs: function(){

	}
})
