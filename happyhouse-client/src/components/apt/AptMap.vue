<template>
  <div id="aptMap">
    <!-- <div id="map"></div> -->
    <kakao-map class="kmap" ref="kmap" />

    <b-button
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="search-collapse"
      @click="visible = !visible"
      id="search-btn"
      >검색</b-button
    >
    <b-collapse id="search-collapse" v-model="visible" class="mt-2" visible>
      <b-form-input
        @keypress.enter="getDongList()"
        v-model="dongInput"
        type="search"
        placeholder="동 입력...."
      ></b-form-input>

      <b-list-group v-for="dongRes in dongList" :key="dongRes.dongCode">
        <b-list-group-item @click="clickDong(dongRes)">{{
          dongRes.fullName
        }}</b-list-group-item>
      </b-list-group>
    </b-collapse>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
const api = apiInstance();

import { mapState, mapActions } from "vuex";
const mapStore = "mapStore";

import KakaoMap from "@/components/apt/map/KakaoMap.vue";
import MarkerHandler from "@/components/apt/map/marker-handler";
export default {
  data() {
    return {
      visible: true,
      // markers: [],
      dongList: [],
      dongInput: "",
      markers: null,
    };
  },
  components: {
    KakaoMap,
  },
  watch: {
    dongInput(newVal, oldVal) {
      if (oldVal && !newVal) {
        this.dongList = "";
      }
    },
    houseInfos() {
      this.markers.add(this.houseInfos);
    },
  },
  computed: {
    ...mapState(mapStore, ["houseInfos", "dong", "selectHouse"]),
  },
  mounted() {
    const vueKakaoMap = this.$refs.kmap;
    this.markers = new MarkerHandler(vueKakaoMap);

    // if (window.kakao && window.kakao.maps) {
    //   this.initMap();
    // } else {
    //   const script = document.createElement("script");
    //   /* global kakao */
    //   script.onload = () => kakao.maps.load(this.initMap);
    //   script.src =
    //     "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
    //   document.head.appendChild(script);
    // }
  },
  methods: {
    ...mapActions(mapStore, [
      "getHouseInfos",
      "searchDong",
      "clearMap",
      "getSelectHouse",
    ]),
    clickDong(dongRes) {
      this.clearMap();
      this.searchDong(dongRes);
      this.getHouseInfos(dongRes.dongCode);
      this.visible = false;

      if (this.$route.path !== "/apt") {
        // 상세 조회 페이지에서 검색하면 다시 목록페이지로
        this.$router.push("/apt");
      }
    },
    // initMap() {
    //   this.clearMap();
    //   const container = document.getElementById("map");
    //   const options = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 5,
    //   };

    //   this.map = new kakao.maps.Map(container, options);
    //   if (Object.keys(this.dong).length > 0) {
    //     this.clickDong(this.dong);
    //   }
    // },
    moveDetail(house) {
      this.$router.push("/apt/deal/" + house.aptCode);
      this.getSelectHouse(house);
    },
    getDongList() {
      this.dongList = "";
      console.log(this.dongInput);
      api
        .get(`/dongsearch`, { params: { keyword: this.dongInput } })
        .then(({ data }) => {
          this.dongList = data;
        })
        .catch((error) => console.log(error));
    },
    test() {
      this.markers.add(this.houseInfos, (houseInfo) => {
        return houseInfo;
      });
    },
    //   setAptsOnMap() {
    //     this.removeMarker();
    //     var bounds = new kakao.maps.LatLngBounds();
    //     var i;
    //     for (i = 0; i < this.houseInfos.length; i++) {
    //       const info = this.houseInfos[i];
    //       var placePosition = new kakao.maps.LatLng(info.lat, info.lng);
    //       var marker = new kakao.maps.Marker({
    //         position: placePosition,
    //         title: info.aptName,
    //         clickable: true,
    //       });
    //       marker.setMap(this.map);
    //       var content = "<div>HELLO</div>";
    //       // var position = new kakao.maps.LatLng(info.lat, info.lng);
    //       var overlay = new kakao.maps.CustomOverlay({
    //         map: this.map,
    //         position: marker.getPosition(),
    //         content: content,
    //         yAnchor: 1,
    //       });
    //       overlay.setMap(null);

    //       kakao.maps.event.addListener(marker, "click", function () {
    //         overlay.setMap(this.map);
    //       });
    //       // var infowindow = new kakao.maps.InfoWindow({
    //       //   content: "HELLO",
    //       // });
    //       // infowindow.open(this.map, marker);
    //       // kakao.maps.event.addListener(marker, "click", function () {
    //       //   // this.moveDetail(info);
    //       //   // console.log(info);
    //       //   infowindow.open(this.map, marker);
    //       //   console.log(infowindow);
    //       // });
    //       // kakao.maps.event.addListener(marker, "mouseover", function () {
    //       //   // console.log(infowindow.getContent());
    //       //   infowindow.open(this.map, marker);
    //       // });
    //       // (function (marker) {
    //       //   // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
    //       //   kakao.maps.event.addListener(marker, "mouseover", function () {
    //       //     // console.log(infowindow.getContent());
    //       //     infowindow.open(this.map, marker);
    //       //     // displayInfowindow(marker, title);
    //       //   });

    //       //   // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
    //       //   kakao.maps.event.addListener(marker, "mouseout", function () {
    //       //     infowindow.close();
    //       //   });
    //       // })(marker);
    //       // marker.setMap(this.map); // 지도 위에 마커를 표출합니다
    //       this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

    //       bounds.extend(placePosition);
    //       this.map.setBounds(bounds);
    //     }
    //   },
    //   addMarker(position) {
    //     // var imageSrc =
    //     //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //     //   imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    //     //   imgOptions = {
    //     //     spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    //     //     spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    //     //     offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    //     //   },
    //     //   markerImage = new kakao.maps.MarkerImage(
    //     //     imageSrc,
    //     //     imageSize,
    //     //     imgOptions
    //     //   ),
    //     var marker = new kakao.maps.Marker({
    //       map: this.map,
    //       position: position, // 마커의 위치
    //     });
    //     var infowindow = new kakao.maps.InfoWindow({
    //       content: "HELLO",
    //       zIndex: 5,
    //     });
    //     (function (marker, infowindow) {
    //       // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
    //       kakao.maps.event.addListener(marker, "mouseover", function () {
    //         infowindow.open(this.map, marker);
    //       });

    //       // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
    //       kakao.maps.event.addListener(marker, "mouseout", function () {
    //         infowindow.close();
    //       });
    //     })(marker, infowindow);
    //     // marker.setMap(this.map); // 지도 위에 마커를 표출합니다
    //     this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

    //     return marker;
    //   },
    //   removeMarker() {
    //     for (var i = 0; i < this.markers.length; i++) {
    //       this.markers[i].setMap(null);
    //     }
    //     this.markers = [];
    //   },
  },
};
</script>

<style scoped>
#aptMap {
  position: relative;
}
.kmap {
  width: 100%;
  height: 600px;
}
#search-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
#search-collapse {
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 1;
}
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
