var map;
function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(11, -73),
        zoom: 8
        };
    map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
        
google.maps.event.addDomListener(window, 'load', initialize);