Map = {
    // map object
    map: null,
 
    // google markers objects
    markers: [],
 
    // google lat lng objects
    latLngs: [],
 
    // our formatted marker data objects
    markerData: [],
    directionsService: null,
    directionsDisplay:  null,
    geocoder: null,
    autocomplete: null,
 
    // add a marker given our formatted marker data object
    addMarker: function(marker) {
        var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
        var gMarker = new google.maps.Marker({
            position: gLatLng,
            map: this.map,
            title: marker.title,
            // animation: google.maps.Animation.DROP,
            icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        this.latLngs.push(gLatLng);
        this.markers.push(gMarker);
        this.markerData.push(marker);
        return gMarker;
    },
    addMarkerCustom: function (latlng, contentWindow, icon, show, key) {
        var optionsMarker = {
            position: latlng,
            icon: icon
        };
        if (key != undefined) {
            var marker = new google.maps.Marker(optionsMarker);
            this.markers[key] = marker;

        } else {
            var marker = new google.maps.Marker(optionsMarker);
            this.markers.push(marker);
        }
        if (show === true) {
            marker.setMap(this.map);
        }
        //Cria o balão do marker
        var infowindow = this.addInfoWindow(contentWindow);
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(this.map, marker);
        });
    },
    addInfoWindow: function (contentString) {
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth:400
        });
        return infowindow;
    },
    // calculate and move the bound box based on our markers
    calcBounds: function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
            bounds.extend(this.latLngs[i]);
        }
        this.map.fitBounds(bounds);
    },
 
    // check if a marker already exists
    markerExists: function(key, val) {
        _.each(this.markers, function(storedMarker) {
            if (storedMarker[key] == val)
                return true;
        });
        return false;
    },
 
    // intialize the map
    initialize: function(id,mapOptions) {
        console.log("[+] Intializing Google Maps...");
        mapOptions = mapOptions || null;
        console.log(mapOptions);
        this.map = new google.maps.Map(
            document.getElementById(id),
            mapOptions
        );
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        //this.directionsDisplay.setMap(this.map);
        this.geocoder = new google.maps.Geocoder();
        // global flag saying we intialized already
        Session.set('map', true);
    },
    calcRoute: function(start,end){
        var start = document.getElementById(start).value;
        var end = document.getElementById(end).value;
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING
        };
          this.directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              this.directionsDisplay.setDirections(result);
            }
          });
    },
    autocomplete: function(field){
        var self = this;
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById(field));
    },
    fillInAddress: function(){
         // Get the place details from the autocomplete object.
          var place = this.autocomplete.getPlace();
          console.log(place);
          for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
          }

          // Get each component of the address from the place details
          // and fill the corresponding field on the form.
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
              var val = place.address_components[i][componentForm[addressType]];
              document.getElementById(addressType).value = val;
            }
          }
    },
    geolocate: function(){
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = new google.maps.LatLng(
              position.coords.latitude, position.coords.longitude);
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          this.autocomplete.setBounds(circle.getBounds());
        });
      }
    },
    codeAddress: function(addressField,callback){

        var self = this;
        if(self.geocoder == null){
            self.geocoder =  new google.maps.Geocoder();
        }
        var address = document.getElementById(addressField).value;
        self.geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (typeof callback == "function") {
                return callback(results[0]);
            }else{
                console.log(results[0]);
            }
          } else {
             if (typeof callback == "function") {
                return "Geocode was not successful for the following reason: " + status;
             }
          }
        });
    }
}