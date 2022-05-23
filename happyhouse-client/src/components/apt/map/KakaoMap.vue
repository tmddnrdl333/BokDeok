<template>
  <div ref="map"></div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const mapStore = "mapStore";
export default {
  computed: {
    ...mapState(mapStore, ["houseInfos", "dong", "selectHouse"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    }
  },
  methods: {
    ...mapActions(mapStore, ["clearMap"]),
    initMap() {
      let kakao = window.kakao;
      this.clearMap();
      const container = this.$refs.map;
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);
      if (Object.keys(this.dong).length > 0) {
        this.clickDong(this.dong);
      }
    },
  },
};
</script>

<style></style>
