<template>
  <div id="interestMap">
    <kakao-map class="kmap" ref="kmap" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const interestAptStore = "interestAptStore";
import KakaoMap from "@/components/apt/map/KakaoMap.vue";
import MarkerHandler from "@/components/apt/map/marker-handler";
export default {
  data() {
    return {
      markers: null, // marker handler
      places: new window.kakao.maps.services.Places(),
      test: [],
    };
  },
  components: {
    KakaoMap,
  },
  watch: {
    selectInterest() {
      if (this.selectInterest === null) {
        this.resetMarkers();
      } else {
        let kakao = window.kakao;
        const houseInfo = this.selectInterest.houseInfo;
        this.$refs.kmap.map.setCenter(
          new kakao.maps.LatLng(houseInfo.lat, houseInfo.lng)
        );
      }
    },
    // interestApts() {
    //   this.searchCategory("SC4", "school");
    //   this.searchCategory("HP8", "hospital");
    //   setTimeout(this.getScore(), 1000);
    // },
  },
  computed: {
    ...mapState(interestAptStore, ["interestApts", "selectInterest"]),
  },
  mounted() {
    this.initMap();
    this.resetMarkers();
    this.getScore();
  },
  methods: {
    ...mapActions(interestAptStore, ["setInterestScore"]),
    initMap() {
      const vueKakaoMap = this.$refs.kmap;
      this.markers = new MarkerHandler(vueKakaoMap, {
        markerClicked: (houseInfo) => {
          this.moveDetail(houseInfo);
        },
      });
    },

    moveDetail(house) {
      this.$router.push("/interest/detail" + house.aptCode);
      this.setSelectHouse(house).then(() =>
        this.markers.highlightMarker(house)
      );
    },
    resetMarkers() {
      this.markers.removeAll();
      const apts = this.interestApts.map(({ houseInfo }) => houseInfo);
      this.markers.add(apts);
    },
    getScore() {
      console.log("CALC SCORE");
      this.interestApts.forEach((obj, index) => {
        var score = { hospital: 0, school: 0, eFclt: 0, jFclt: 0, sFclt: 0 };
        if (obj.hospital.length > 0) {
          const dist = this.getDistance(
            obj.houseInfo.lat,
            obj.houseInfo.lng,
            obj.hospital[0].y,
            obj.hospital[0].x
          );
          score.hospital = this.rangeScore(dist);
        }
        if (obj.school.length > 0) {
          const dist = this.getDistance(
            obj.houseInfo.lat,
            obj.houseInfo.lng,
            obj.school[0].y,
            obj.school[0].x
          );
          score.school = this.rangeScore(dist);
        }
        if (obj.nearestFclts.eFclt.length > 0) {
          score.eFclt = this.getFcltScore(obj, "eFclt");
        }
        if (obj.nearestFclts.jFclt.length > 0) {
          score.jFclt = this.getFcltScore(obj, "jFclt");
        }
        if (obj.nearestFclts.sFclt.length > 0) {
          score.sFclt = this.getFcltScore(obj, "sFclt");
        }
        // console.log(score);
        this.setInterestScore({ index: index, score: score });
      });
    },
    getFcltScore(obj, fclt) {
      var dist = [];
      obj.nearestFclts[fclt].forEach((e) => {
        dist.push(
          this.getDistance(
            obj.houseInfo.lat,
            obj.houseInfo.lng,
            e[1].result.y,
            e[1].result.x
          )
        );
      });
      var minDist = Math.min(dist);
      return this.rangeScore(minDist);
    },
    rangeScore(dist) {
      if (dist <= 300) return 3;
      else if (dist <= 700) return 2;
      else return 1;
    },
    getDistance(lat1, lng1, lat2, lng2) {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lng2 - lng1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d * 1000;
    },
  },
};
</script>

<style>
.kmap {
  width: 100%;
  height: 100%;
}
</style>
