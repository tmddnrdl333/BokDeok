const kakao = window.kakao;
var markers = [];
let setArr = [[], [], []];
let fcltMarkers = [];
class MarkerHandler {
  fcltCoords = [[], [], []];
  constructor(vueKakaoMap, options) {
    this.vueMap = vueKakaoMap;
    this.options = options;
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
      const markerImage = new kakao.maps.MarkerImage(
        "data:image/gif;base64,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",
        new kakao.maps.Size(36, 36),
        new kakao.maps.Point(18, 36)
      );
      markerInstance.setImage(markerImage);
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
    this.fcltCoords = [[], [], []];
  }
  highlightMarker(info) {
    // !!
    const h_markerImage = new kakao.maps.MarkerImage(
      "http://localhost:8080/img/h_house.f7e5fdf7.gif",
      new kakao.maps.Size(43.2, 55.2),
      new kakao.maps.Point(21.6, 55.2)
    );
    const markerImage = new kakao.maps.MarkerImage(
      "data:image/gif;base64,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",
      new kakao.maps.Size(36, 36),
      new kakao.maps.Point(18, 36)
    );
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].$$.data.aptCode == info.aptCode) {
        markers[i].setImage(h_markerImage);
      } else markers[i].setImage(markerImage);
    }
  }
  // !!
  setFclt(arrArr, dongName) {
    let geocoder = new kakao.maps.services.Geocoder();
    for (let index in arrArr) {
      arrArr[index].forEach((item) => {
        geocoder.addressSearch(item.addrKeyword, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (
            status === kakao.maps.services.Status.OK &&
            result[0].road_address.region_3depth_name == dongName
          ) {
            setArr[index].push({ result: result[0], fcltName: item.fcltName });
          }
        });
      });
    }
    this.fcltCoords = setArr;
    console.log("fclt Comp");
  }
  markFclt(index) {
    fcltMarkers.forEach((item) => {
      item.setMap(null);
    });
    fcltMarkers = [];
    // !!
    let imgLink = "http://localhost:8080/img/elder.c56a11d3.png";
    if (index == 1) imgLink = "http://localhost:8080/img/child.6db9934a.png";
    else if (index == 2)
      imgLink = "http://localhost:8080/img/disordered.a32b43df.png";
    let imageSrc = imgLink,
      imageSize = new kakao.maps.Size(30, 30),
      imageOption = { offset: new kakao.maps.Point(15, 30) };

    // !!
    let markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    let thismap = this.vueMap;
    if (setArr[index].length == 0) {
      alert("선택한 시설 정보가 없습니다.");
      return;
    }
    setArr[index].forEach((item) => {
      let coords = new kakao.maps.LatLng(item.result.y, item.result.x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      let marker = new kakao.maps.Marker({
        map: thismap.map,
        position: coords,
        image: markerImage,
      });
      fcltMarkers.push(marker);
      const infowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="padding:5px;z-index:1;">' + item.fcltName + "</div>",
      });
      kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(this.vueMap.map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });
    });
  }

  addMarker(userData, index) {
    var image = {
      0: "http://localhost:8080/img/elder.c56a11d3.png",
      1: "http://localhost:8080/img/child.6db9934a.png",
      2: "http://localhost:8080/img/disordered.a32b43df.png",
      3: "http://localhost:8080/img/school.66b4af47.png",
      4: "http://localhost:8080/img/hospital.f050171d.png",
    };
    let imgLink = image[index];

    let imageSrc = imgLink,
      imageSize = new kakao.maps.Size(30, 30),
      imageOption = { offset: new kakao.maps.Point(15, 30) };

    // !!
    let markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    var bounds = new kakao.maps.LatLngBounds();
    userData.forEach((data) => {
      // const houseInfo = data;
      const placePosition = new kakao.maps.LatLng(data.lat, data.lng);
      const markerInstance = new kakao.maps.Marker({
        map: this.vueMap.map,
        position: placePosition,
        image: markerImage,
      });
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
        content: '<div style="padding:5px;z-index:1;">' + data.name + "</div>",
      });
      kakao.maps.event.addListener(markerInstance, "mouseover", () => {
        infowindow.open(this.vueMap.map, markerInstance);
      });
      kakao.maps.event.addListener(markerInstance, "mouseout", () => {
        infowindow.close();
      });
    });
  }
}

export default MarkerHandler;
