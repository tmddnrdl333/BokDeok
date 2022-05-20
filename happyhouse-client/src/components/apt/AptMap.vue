<template>
  <div id="aptMap">
    <div id="map"></div>

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
        @keyup.enter="getDongList()"
        v-model="dongInput"
        type="search"
        placeholder="동 입력...."
      ></b-form-input>

      <b-list-group v-for="dongRes in dongList" :key="dongRes.dongCode">
        <b-list-group-item>{{ dongRes.dongCode }}</b-list-group-item>
      </b-list-group>
    </b-collapse>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
const api = apiInstance();

import { mapState } from "vuex";
const aptStore = "aptStore";
export default {
  data() {
    return {
      visible: true,
      markers: [],
      dongList: [],
      dongInput: "",
    };
  },
  computed: {
    ...mapState(aptStore, ["apts"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);
    },

    getDongList() {
      console.log("getDongList");
      console.log(this.dongInput);
      api
        .get(`/map/dong`, { params: { input: this.dongInput } })
        .then(({ data }) => {
          this.dongList = data;
        })
        .catch((error) => console.log(error));
    },

    setAptsOnMap() {
      // let i = 0;
      for (let k = 0; k < this.markers.length; k++) {
        this.markers[k].setMap(null);
      }
      this.markers = [];
      this.geocoer = new kakao.map.services.Geocoder();
      this.apts.forEach(() => {
        // const placePosition = new kakao.maps.LatLng(item.lat, item.lng);
        // const marker = addMarker(placePosition);
      });
    },
  },
};
</script>

<style scoped>
#aptMap {
  position: relative;
}
#map {
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
