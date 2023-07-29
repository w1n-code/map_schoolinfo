var mapContainer = document.getElementById('map');
var mapOptions = {
  center: new kakao.maps.LatLng(35.887238, 128.585070),
  level: 5
};

var map = new kakao.maps.Map(mapContainer, mapOptions);

var data = [
  [35.887238, 128.585070, '대구일중학교', '8/18', '9/26~9/27 | 2,3학년'],
  [35.880818, 128.598612, '경명여자중학교', '7/27', '9/21~9/22 | 2,3학년'],
  [35.881453, 128.576243, '경일중학교', '8/16', '9/25~9/26 | 2,3학년']
];

var markers = [];
var overlays = [];

for (var i = 0; i < data.length; i++) {
  var marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(data[i][0], data[i][1])
  });

  var contentDiv = document.createElement('div');
  contentDiv.className = 'wrap';

  var infoDiv = document.createElement('div');
  infoDiv.className = 'info';

  var titleDiv = document.createElement('div');
  titleDiv.className = 'title';
  titleDiv.textContent = data[i][2];

  var closeDiv = document.createElement('div');
  closeDiv.className = 'close';
  closeDiv.title = 'close';
  closeDiv.onclick = (function (index) {
    return function () {
      closeOverlay(index);
    };
  })(i);

  titleDiv.appendChild(closeDiv);
  infoDiv.appendChild(titleDiv);

  var explainDiv = document.createElement('div');
  explainDiv.className = 'explain';

  var ul = document.createElement('ul');

  var liOpening = document.createElement('li');
  liOpening.textContent = '개학식: ' + data[i][3];
  ul.appendChild(liOpening);

  var liMidterm = document.createElement('li');
  liMidterm.textContent = '중간고사: ' + data[i][4];
  ul.appendChild(liMidterm);

  // Add other li elements for "In practice 1", "In practice 2", etc., if required.

  explainDiv.appendChild(ul);
  infoDiv.appendChild(explainDiv);
  contentDiv.appendChild(infoDiv);

  var overlay = new kakao.maps.CustomOverlay({
    content: contentDiv,
    map: map,
    position: new kakao.maps.LatLng(data[i][0], data[i][1])
  });

  markers.push(marker);
  overlays.push(overlay);
}

function closeOverlay(index) {
  overlays[index].setMap(null);
}

for (var i = 0; i < markers.length; i++) {
  kakao.maps.event.addListener(markers[i], 'click', (function (index) {
    return function () {
      overlays[index].setMap(map);
    };
  })(i));
}
