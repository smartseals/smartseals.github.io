var map,
    currentPositionMarker,
    mapCenter = new google.maps.LatLng(13, -71),
    map;

function initLocationProcedure(){
  initilizeMap();
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
  }
  else{
    alert("Your browser does not support the Geolocation API");
  }
}

function initilizeMap(){
  map = new google.maps.Map(document.getElementById('map-canvas'),{
    zoom: 16,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  google.maps.event.addListener(map,'zoom_changed',function(){
  var zoomLevel = map.getZoom();
  console.log(zoomLevel);
});
}


function displayAndWatch(position){
  setCurrentPosition(position);
  watchCurrentPosition();

}

function setCurrentPosition(pos){
  var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  currentPositionMarker = new google.maps.Marker({
    map: map,
    position: position, 
    title: "Current Position!",
    icon: getCircle()
  });
  map.panTo(position);
}

function getCircle(){
  return{
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'green',
    fillOpacity: 0.8,
    scale: 8,
    strokeColor: 'red',
    strokeWeight: 5,
    strokeOpacity: 0.5 
  };
}

var geo_options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout:Infinity 
};

function geo_error(){
  alert("Sorry, no position available");
}

function watchCurrentPosition(){
  var positionTimer = navigator.geolocation.watchPosition(
    function(position){
      setMarkerPosition(currentPositionMarker, position);
  }, geo_error, geo_options); 
}
 
 

function setMarkerPosition(marker, position){
  console.log(position);
  var markerPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  marker.setPosition(markerPosition);

  map.panTo(markerPosition);
}

function locError(){
  alert("The current position could not be found");
}


$(document).ready(function(){
  initLocationProcedure();
});


