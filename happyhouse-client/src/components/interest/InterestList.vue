<template>
  <div id="interestList">
    <div style="height: 50px; text-align: center">
      <h4>관심 아파트 목록</h4>
    </div>
    <div id="interestApts-list" v-if="interestApts.length">
      <b-form-select v-model="selected" :options="options"></b-form-select>
      <b-list-group
        v-for="interest in interestApts"
        :key="interest.houseInfo.aptCode"
      >
        <b-list-group-item @click="moveDetail(interest)"
          ><h5>{{ interest.houseInfo.aptName }}</h5></b-list-group-item
        >
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const interestAptStore = "interestAptStore";
export default {
  data() {
    return {
      selected: null,
      options: [],
    };
  },
  mounted() {
    this.setSelectInterest(null);
  },
  computed: {
    ...mapState(interestAptStore, ["interestApts"]),
  },
  methods: {
    ...mapActions(interestAptStore, ["setSelectInterest", "removeInterestApt"]),
    moveDetail(interest) {
      this.$router.push("/interest/detail/" + interest.houseInfo.aptCode);
      this.setSelectInterest(interest);
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
    calcScore() {
      this.interestApts.forEach((obj) => {
        console.log(obj);
        if (obj.hospital.length > 0) {
          const dist = this.getDistance(
            obj.houseInfo.lat,
            obj.houseInfo.lng,
            obj.hospital[0].y,
            obj.hospital[0].x
          );
          if (dist <= 300) obj["score"]["hostpital"] = 3;
          else if (dist <= 700) obj["score"]["hostpital"] = 2;
          else obj["score"]["hostpital"] = 1;
        } else {
          obj["score"]["hostpital"] = 0;
        }
      });
    },
  },
};
</script>

<style>
#interestApts-list {
  position: relative;
  height: calc(100% - 100px);
  overflow-y: scroll;
}
</style>
