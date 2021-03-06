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
    interestApts() {
      this.resetMarkers();
    },
    selectInterest() {
      if (this.selectInterest === null) {
        this.resetMarkers();
      } else {
        // const houseInfo = this.selectInterest.houseInfo;
        // this.$refs.kmap.map.setCenter(
        //   new window.kakao.maps.LatLng(houseInfo.lat, houseInfo.lng)
        // );

        this.markers.removeAll();
        let list = [];
        this.selectInterest.nearestFclts.sFclt.forEach((e) => {
          list.push({
            lat: e[1].result.y,
            lng: e[1].result.x,
            name: e[1].fcltName,
          });
        });
        this.markers.addMarker(list, 0);
        list = [];
        this.selectInterest.nearestFclts.jFclt.forEach((e) => {
          list.push({
            lat: e[1].result.y,
            lng: e[1].result.x,
            name: e[1].fcltName,
          });
        });
        this.markers.addMarker(list, 1);
        list = [];
        this.selectInterest.nearestFclts.eFclt.forEach((e) => {
          list.push({
            lat: e[1].result.y,
            lng: e[1].result.x,
            name: e[1].fcltName,
          });
        });
        this.markers.addMarker(list, 2);
        list = [];
        this.selectInterest.school.forEach((e) => {
          list.push({
            lat: e.y,
            lng: e.x,
            name: e.place_name,
          });
        });
        this.markers.addMarker(list, 3);
        list = [];
        this.selectInterest.hospital.forEach((e) => {
          list.push({
            lat: e.y,
            lng: e.x,
            name: e.place_name,
          });
        });
        this.markers.addMarker(list, 4);
        this.markers.add([this.selectInterest.houseInfo]);
        this.$refs.kmap.map.setLevel(4);
      }
    },
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
    ...mapActions(interestAptStore, ["setInterestScore", "setSelectInterest"]),
    initMap() {
      const vueKakaoMap = this.$refs.kmap;
      this.markers = new MarkerHandler(vueKakaoMap, {
        markerClicked: (house) => {
          const interest = this.interestApts.find(
            (e) => e.houseInfo.aptCode === house.aptCode
          );

          this.moveDetail(interest);
        },
      });
    },

    moveDetail(interest) {
      console.log(interest);
      this.$router.push("/interest/detail/" + interest.houseInfo.aptCode);
      this.setSelectInterest(interest).then(() =>
        this.markers.highlightMarker(interest.houseInfo)
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
        var score = {
          hospital: 0,
          school: 0,
          eFclt: 0,
          jFclt: 0,
          sFclt: 0,
          total: 0,
        };
        if (obj.hospital.length > 0) {
          const dist = this.getDistance(
            obj.houseInfo.lat,
            obj.houseInfo.lng,
            obj.hospital[0].y,
            obj.hospital[0].x
          );
          score.hospital = this.rangeScore(dist);
          score.total += score.hospital;
        }
        if (obj.school.length > 0) {
          const dist = this.getDistance(
            obj.houseInfo.lat,
            obj.houseInfo.lng,
            obj.school[0].y,
            obj.school[0].x
          );
          score.school = this.rangeScore(dist);
          score.total += score.school;
        }
        if (obj.nearestFclts.eFclt.length > 0) {
          score.eFclt = this.rangeScore(obj.nearestFclts.eFclt[0][0]);
          score.total += score.eFclt;
        }
        if (obj.nearestFclts.jFclt.length > 0) {
          score.jFclt = this.rangeScore(obj.nearestFclts.jFclt[0][0]);
          score.total += score.jFclt;
        }
        if (obj.nearestFclts.sFclt.length > 0) {
          score.sFclt = this.rangeScore(obj.nearestFclts.sFclt[0][0]);
          score.total += score.sFclt;
        }
        score.total = score.total / 5;
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
