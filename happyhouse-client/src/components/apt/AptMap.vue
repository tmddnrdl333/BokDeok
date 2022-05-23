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
        <b-list-group-item
          @click="[clickDong(dongRes), getFcltList(dongRes.dongCode)]"
          >{{ dongRes.fullName }}</b-list-group-item
        >
      </b-list-group>
    </b-collapse>

    <div class="fcltIcons" :aria-expanded="visible ? 'true' : 'false'">
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
import MarkerHandler from "@/components/apt/map/marker-handler";
export default {
  data() {
    return {
      visible: true,
      dongList: [],
      dongInput: "",
      markers: null, // marker handler
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
      "getSelectHouse",
      "getFclts",
    ]),
    clickDong(dongRes) {
      this.clearMap();
      this.markers.removeAll();
      this.searchDong(dongRes);
      this.getHouseInfos(dongRes.dongCode);
      this.visible = false;

      if (this.$route.path !== "/apt") {
        // 상세 조회 페이지에서 검색하면 다시 목록페이지로
        this.$router.push("/apt");
      }
    },
    initMap() {
      const vueKakaoMap = this.$refs.kmap;
      this.markers = new MarkerHandler(vueKakaoMap, {
        markerClicked: (houseInfo) => {
          // console.log("[clicked]", houseInfo);
          this.moveDetail(houseInfo);
        },
      });
    },
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
    markSenior() {
      console.log("marking senior");
      console.log(this.seniors);
    },
    markJunior() {
      console.log("marking junior");
      console.log(this.juniors);
    },
    markEtc() {
      console.log("marking etc");
      console.log(this.etcs);
    },
    getFcltList(dongCode) {
      this.getFclts(dongCode);
      this.markers.setFclt([this.seniors, this.juniors, this.etcs]);
    },
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
.fcltIcons {
  position: absolute;
  top: 15px;
  left: 75px;
  z-index: 1;
}
</style>
