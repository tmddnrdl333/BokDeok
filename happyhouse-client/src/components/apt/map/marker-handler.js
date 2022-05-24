const kakao = window.kakao;
var markers = [];
let setArr = [[], [], []];
let fcltMarkers = [];
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
        content:
          '<div style="padding:5px;z-index:1;">' + data.aptName + "</div>",
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
    //
    fcltMarkers.forEach((item) => {
      item.setMap(null);
    });
    fcltMarkers = [];
    setArr = [[], [], []];
  }
  highlightMarker(info) {
    console.log("MARKER HANDLER");
    for (var i = 0; i < markers.length; i++) {
      if (markers[i] === info) {
        console.log(info);
      }
    }
  }
  setFclt(arrArr, dongName) {
    let geocoder = new kakao.maps.services.Geocoder();

    for (let index in arrArr) {
      arrArr[index].forEach((item) => {
        geocoder.addressSearch(item, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (
            status === kakao.maps.services.Status.OK &&
            result[0].road_address.region_3depth_name == dongName
          ) {
            setArr[index].push(result[0]);
          }
        });
      });
    }
    console.log("fclt Comp");
  }
  markFclt(index) {
    fcltMarkers.forEach((item) => {
      item.setMap(null);
    });
    fcltMarkers = [];
    let imageSrc = "https://cdn-icons-png.flaticon.com/512/447/447031.png",
      imageSize = new kakao.maps.Size(22, 22),
      imageOption = { offset: new kakao.maps.Point(10, 22) };
    let markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    let thismap = this.vueMap;
    setArr[index].forEach((item) => {
      let coords = new kakao.maps.LatLng(item.y, item.x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      let marker = new kakao.maps.Marker({
        map: thismap.map,
        position: coords,
        image: markerImage,
      });
      fcltMarkers.push(marker);
    });
    console.log(fcltMarkers);
  }
}

export default MarkerHandler;
