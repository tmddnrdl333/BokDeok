<template>
  <div id="aptMap">
    <!-- <div id="map"></div> -->
    <kakao-map class="kmap" ref="kmap" />

    <div class="fcltIcons">
      <img
        src="@/assets/senior.png"
        width="30px"
        alt="senior"
        @click="markSenior"
      />
      <img
        src="@/assets/junior.png"
        width="30px"
        alt="junior"
        @click="markJunior"
      />
      <img src="@/assets/junior.png" width="30px" alt="etc" @click="markEtc" />
    </div>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
const api = apiInstance();

import { mapState, mapActions } from "vuex";
const mapStore = "mapStore";

import KakaoMap from "@/components/apt/map/KakaoMap.vue";
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
      console.log("APTMAP!!");
      console.log(this.selectHouse.houseInfo);
      this.markers.highlightMarker(this.selectHouse.houseInfo);
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
      "initMap",
    ]),
    moveDetail(house) {
      this.$router.push("/apt/deal/" + house.aptCode);
      this.setSelectHouse(house).then(() =>
        this.markers.highlightMarker(house)
      );
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
    getFcltList(dongRes) {
      this.getFclts(dongRes.dongCode).then(() => {
        let dongName = dongRes.fullName.split(" ").at(-1);
        this.markers.setFclt([this.seniors, this.juniors, this.etcs], dongName);
      });
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
  right: 15px;
  z-index: 1;
}
</style>
