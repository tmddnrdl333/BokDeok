const kakao = window.kakao;
var markers = [];
class MarkerHandler {
  constructor(vueKakaoMap, options) {
    // console.log(vueKakaoMap);
    this.vueMap = vueKakaoMap;
    this.options = options;
    // console.log(this.map);
  }
  add(userData) {
    var bounds = new kakao.maps.LatLngBounds();
    userData.forEach((data) => {
      // const houseInfo = data;
      const placePosition = new kakao.maps.LatLng(data.lat, data.lng);
      const markerInstance = new kakao.maps.Marker({
        map: this.vueMap.map,
        position: placePosition,
      });
      // console.log(markerInstance);
      bounds.extend(placePosition);
      this.vueMap.map.setBounds(bounds);
      markers.push(markerInstance);

      markerInstance.$$ = {
        data,
      };
      if (this.options.markerClicked) {
        kakao.maps.event.addListener(markerInstance, "click", () => {
          this.options.markerClicked(markerInstance.$$.data);
        });
      }

      const infowindow = new kakao.maps.InfoWindow({
        content: data.aptName,
      });
      kakao.maps.event.addListener(markerInstance, "mouseover", () => {
        infowindow.open(this.vueMap.map, markerInstance);
      });
      kakao.maps.event.addListener(markerInstance, "mouseout", () => {
        infowindow.close();
      });
    });
  }
  removeAll() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }
  setFclt([arr1, arr2, arr3]) {
    var geocoder = new kakao.maps.services.Geocoder();
    console.log(this.vueMap);
    geocoder.addressSearch(
      "제주특별자치도 제주시 첨단로 242",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: this.vueMap.map,
            position: coords,
          });
          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">요기용</div>',
          });
          infowindow.open(this.vueMap.map, marker);
        }
      }
    );
    console.log("from here");
    arr1.forEach((item) => {
      console.log(item);
    });
    console.log(arr2);
    console.log(arr3);
    console.log("to here");
  }
}

export default MarkerHandler;
