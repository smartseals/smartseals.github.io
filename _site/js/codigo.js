var map,
    currentPositionMarker,
    mapCenter = new google.maps.LatLng(10, -72),
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
    zoom: 10,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP
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
    title: "Current Position!"
  });
  map.panTo(position);
}



function watchCurrentPosition(){
  var positionTimer = navigator.geolocation.watchPosition(
    function(position){
      setMarkerPosition(currentPositionMarker, position);
  }); 
}

function setMarkerPosition(marker, position){
  console.log(position);
  marker.setPosition(
    new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  );
}

function locError(){
  alert("The current position could not be found");
}

$(document).ready(function(){
  initLocationProcedure();
});
