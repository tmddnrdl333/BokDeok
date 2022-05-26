<template>
  <div>
    <interest-map class="map-comp"></interest-map>
    <router-view class="interest-content"></router-view>
  </div>
</template>

<script>
import InterestMap from "@/components/interest/InterestMap.vue";
export default {
  components: {
    InterestMap,
  },
};
</script>

<style scoped>
.col {
  padding: 0;
}
.map-comp {
  position: absolute;
  width: 100%;
  height: 100%;
  float: left;
}
.interest-content {
  position: absolute;
  top: 50px;
  left: 10px;
  height: 100%;
  width: 380px;
  float: left;
  z-index: 1;
}
#interestList {
  background-color: #f3e9dd;
  min-height: 100px;
  max-height: calc(100vh - 60px);
}
#interestDetail {
  background-color: #f0e5cf;
  height: calc(100% - 60px);
}
#interestMap {
  background-color: mediumseagreen;
  padding: 0;
  height: 100vh;
  width: calc(100vw - 65px);
  z-index: 1;
}
</style>
