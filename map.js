  var mapContainer = document.getElementById('map');
  var mapOptions = {
    center: new kakao.maps.LatLng(35.887238, 128.585070),
    level: 6
  };

  var map = new kakao.maps.Map(mapContainer, mapOptions);

  var data = [
    [35.887238, 128.585070, '대구일중학교'],
    [35.880818, 128.598612, '경명여자중학교'],
    [35.881453, 128.576243, '경일중학교']
  ];

  var markers = [];
  var overlays = [];

  for (var i = 0; i < data.length; i++) {
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(data[i][0], data[i][1])
    });

    var overlay = new kakao.maps.CustomOverlay({
      content:
        '<div class="wrap">' +
        ' <div class="info">' +
        '   <div class="title">' +
        data[i][2] +
        '     <div class="close" onclick="closeOverlay(' + i + ')" title="close"></div>' +
        '   </div>' +
        ' </div>' +
        '</div>',
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
