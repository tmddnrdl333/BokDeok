<template>
  <div id="aptMap">
    <!-- <div id="map"></div> -->
    <kakao-map class="kmap" ref="kmap" />

    <div class="fcltIcons">
      <div>
        <img
          src="@/assets/senior.png"
          width="30px"
          alt="senior"
          @click="markSenior"
        />
      </div>
      <div>
        <img
          src="@/assets/junior.png"
          width="30px"
          alt="junior"
          @click="markJunior"
        />
      </div>
      <div>
        <img
          src="@/assets/junior.png"
          width="30px"
          alt="etc"
          @click="markEtc"
        />
      </div>
    </div>
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
      dongList: [],
      dongInput: "",
      markers: null, // marker handler
      dongRes: {},
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
    selectHouse() {
      this.markers.highlightMarker(this.selectHouse.houseInfo);
    },
    houseInfos() {
      this.resetMarkers();
    },
    dong() {
      this.getFcltList(this.dong);
    },
  },
  computed: {
    ...mapState(mapStore, [
      "houseInfos",
      "dong",
      "selectHouse",
      "seniors",
      "juniors",
      "etcs",
    ]),
  },
  mounted() {
    this.initMap();
  },
  methods: {
    ...mapActions(mapStore, [
      "getHouseInfos",
      "searchDong",
      "clearMap",
      "setSelectHouse",
      "getFclts",
    ]),
    moveDetail(house) {
      this.$router.push("/apt/deal/" + house.aptCode);
      this.setSelectHouse(house).then(() =>
        this.markers.highlightMarker(house)
      );
    },
    initMap() {
      const vueKakaoMap = this.$refs.kmap;
      this.markers = new MarkerHandler(vueKakaoMap, {
        markerClicked: (houseInfo) => {
          this.moveDetail(houseInfo);
        },
      });
    },
    getDongList() {
      this.dongList = "";
      return api
        .get(`/dongsearch`, { params: { keyword: this.dongInput } })
        .then(({ data }) => {
          this.dongList = data;
        })
        .catch((error) => console.log(error));
    },
    markSenior() {
      console.log("marking senior");
      this.markers.markFclt(0);
    },
    markJunior() {
      console.log("marking junior");
      this.markers.markFclt(1);
    },
    markEtc() {
      console.log("marking etc");
      this.markers.markFclt(2);
    },
    getFcltList(dong) {
      this.getFclts(dong.dongCode).then(() => {
        let dongName = dong.fullName.split(" ").at(-1);
        this.markers.setFclt([this.seniors, this.juniors, this.etcs], dongName);
      });
    },
    resetMarkers() {
      this.markers.removeAll();
      this.markers.add(this.houseInfos);
    },
  },
};
</script>

<style scoped>
.kmap {
  width: 100%;
  height: 100%;
}

#search-collapse {
  position: absolute;
  top: 0px;
  left: 10px;
  z-index: 2;
}
#search-result {
  z-index: 3;
}
.fcltIcons {
  position: absolute;
  top: 15px;
  left: 365px;
  z-index: 1;
}
</style>
