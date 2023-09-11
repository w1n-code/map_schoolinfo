var mapContainer = document.getElementById('map');
var mapOptions = {
  center: new kakao.maps.LatLng(35.874027, 128.592173),
  level: 7
};

var map = new kakao.maps.Map(mapContainer, mapOptions);

var data = [
  [35.887238, 128.585070, '대구일중학교', 'https://tgil.dge.ms.kr', '개학식: 8/21', '중간고사: 9/26~9/27 | 2,3학년', '기말고사: 11/1~11/3 | 3학년', '기말고사: 11/29~12/1 | 2학년', '종업/졸업식: 24.2/6 (겨울방학: 12/30~24.2/1)'],
  [35.880818, 128.598612, '경명여자중학교', 'https://kmschool.dge.ms.kr', '개학식: 7/27', '중간고사: 9/21~9/22 | 2,3학년', '기말고사: 10/31~11/2 | 3학년', '기말고사: 11/27~11/29 | 2학년', '종업/졸업식: 12/15'],
  [35.881453, 128.576243, '경일중학교','https://e-kyungil.dge.ms.kr', '개학식: 8/16', '중간고사: 9/25~9/26 | 2,3학년', '기말고사: 11/1~11/3 | 3학년', '기말고사: 12/6~12/8 | 2학년', '종업/졸업식: 2/1 (겨울방학: 12/30~24.1/28)'],
  [35.889879, 128.588891, '침산중학교', 'https://chimsan.dge.ms.kr', '개학식: 8/18', '중간고사: 9/26~9/27 | 2,3학년', '기말고사: 11/1~11/3 | 3학년', '기말고사: 11/29~12/1 | 2학년', '종업/졸업식: 2/7 (겨울방학: 12/30~24.1/31)'],
  [35.858528, 128.584136, '대구경구중학교', 'https://gyeonggu.dge.ms.kr', '개학식: 8/16', '중간고사: 9/26~9/27 | 2,3학년', '기말고사: 11/1~11/3 | 3학년', '기말고사: 12/6~12/8 | 2학년', '종업/졸업식: 24.2/7 (겨울방학: 12/28~24.1/31)'],
[35.852400, 128.586360, '경상중학교', 'https://kyungsang.dge.ms.kr', '개학식: 8/17', '중간고사: 9/21~9/22 | 2,3학년', '기말고사: 10/31~11/2 | 3학년', '기말고사: 12/5~12/7 | 2학년', '종업/졸업식: 24.2/7(겨울방학: 12/29~24.1/31)'],
[35.867161, 128.581208, '계성중학교', 'https://keisung.dge.ms.kr', '개학식: 8/16', '중간고사: 9/26~6/27 | 2,3학년', '기말고사: 11/2~11/6 | 3학년', '기말고사: 12/6~12/8 | 2학년', '종업/졸업식: 24.2/6(겨울방학: 12/29~24.1/31)']
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

  contentDiv.addEventListener('wheel', function() {
    kakao.maps.event.preventMap();
  });
  contentDiv.addEventListener('touchstart', function() {
     kakao.maps.event.preventMap();
   });

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

  var liTest1 = document.createElement('li');
  var aTag = document.createElement('a');
  aTag.textContent = '학교 홈페이지로 이동';
  aTag.href = data[i][3];
  liTest1.appendChild(aTag);
  ul.appendChild(liTest1);

  for(let j=4; j < data[i].length; j++){
      var some = document.createElement('li');
  		some.textContent = data[i][j];
 		  ul.appendChild(some);
  }

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

    closeAllOverlays();

  // Function to close all overlays
  function closeAllOverlays() {
    for (var i = 0; i < overlays.length; i++) {
      overlays[i].setMap(null);
    }
  }

  // Add click event listeners to the markers to create and show the overlay
  for (var i = 0; i < markers.length; i++) {
    kakao.maps.event.addListener(markers[i], 'click', (function(index) {
      return function() {
        //closeAllOverlays(); // Close any previously open overlay
        overlays[index].setMap(map); // Show the clicked overlay
      };
    })(i));
  }
