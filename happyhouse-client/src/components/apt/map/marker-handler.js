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
}

export default MarkerHandler;
