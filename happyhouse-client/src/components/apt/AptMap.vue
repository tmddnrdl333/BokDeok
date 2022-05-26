<template>
  <div id="aptMap">
    <!-- <div id="map"></div> -->
    <kakao-map class="kmap" ref="kmap" />

    <div class="fcltIcons" v-if="showFcltIcon">
      <b-row class="mb-1">
        <b-col>
          <img
            v-b-popover.hover.right="'노인 복지시설 보기'"
            title=""
            src="@/assets/icon/elder_icon.png"
            width="45px"
            alt="senior"
            @click="markSenior"
          />
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <img
            v-b-popover.hover.right="'아동 복지시설 보기'"
            src="@/assets/icon/child_icon.png"
            width="45px"
            alt="junior"
            @click="markJunior"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <img
            v-b-popover.hover.right="'장애인 복지시설 보기'"
            src="@/assets/icon/disordered_icon.png"
            width="45px"
            alt="etc"
            @click="markEtc"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
const api = apiInstance();

import { mapState, mapActions } from "vuex";
const mapStore = "mapStore";
const interestAptStore = "interestAptStore";
import KakaoMap from "@/components/apt/map/KakaoMap.vue";
import MarkerHandler from "@/components/apt/map/marker-handler";
export default {
  data() {
    return {
      dongList: [],
      dongInput: "",
      markers: null, // marker handler
      dongRes: {},

      places: new window.kakao.maps.services.Places(), // school, hospital search
      showFcltIcon: false,
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
      if (this.selectHouse.houseInfo != 0) {
        let origin = [
          this.selectHouse.houseInfo.lat,
          this.selectHouse.houseInfo.lng,
        ];
        let allFclts = this.markers.fcltCoords;
        this.storeFcltCoords({ origin, allFclts });
      }
    },
    houseInfos() {
      this.resetMarkers();
    },
    dong() {
      if (this.dong.dongCode == undefined) return;
      this.getFcltList(this.dong);
      this.showFcltIcon = true;
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
    ...mapState(interestAptStore, ["interestApts"]),
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
      "storeFcltCoords",
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
  left: 395px;
  z-index: 1;
}
</style>
