const kakao = window.kakao;
class MarkerHandler {
  constructor(vueKakaoMap) {
    // console.log(vueKakaoMap);
    this.vueMap = vueKakaoMap;
    // console.log(this.map);
  }
  add(userData) {
    var bounds = new kakao.maps.LatLngBounds();
    userData.forEach((data) => {
      const houseInfo = data;
      const placePosition = new kakao.maps.LatLng(houseInfo.lat, houseInfo.lng);
      const markerInstance = new kakao.maps.Marker({
        map: this.vueMap.map,
        position: placePosition,
      });
      // console.log(markerInstance);
      markerInstance.bounds.extend(placePosition);
      this.vueMap.map.setBounds(bounds);
    });
  }
}

export default MarkerHandler;
