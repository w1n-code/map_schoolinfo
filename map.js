var mapContainer = document.getElementById('map');
var mapOptions = {
  center: new kakao.maps.LatLng(37.5665, 126.9780), // Set the initial map center
  level: 5 // Set the initial zoom level
};
var map = new kakao.maps.Map(mapContainer, mapOptions);

var markerPosition = new kakao.maps.LatLng(37.5665, 126.9780); // Set the marker position
var marker = new kakao.maps.Marker({
  position: markerPosition
});
marker.setMap(map); // Add the marker to the map
