<template>
  <div>
    <apt-map class="map-comp"></apt-map>
    <apt-search-bar class="search-bar"></apt-search-bar>
    <router-view class="apt-content"></router-view>
  </div>
</template>

<script>
import AptMap from "@/components/apt/AptMap.vue";
import AptSearchBar from "@/components/apt/AptSearchBar.vue";
export default {
  components: {
    AptMap,
    AptSearchBar,
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
.apt-content {
  position: absolute;
  top: 50px;
  left: 10px;
  height: 100%;
  width: 350px;
  float: left;
  z-index: 1;
}
.search-bar {
  position: absolute;
  top: 0px;
  left: 10px;
  z-index: 5;
}
#aptList {
  background-color: lemonchiffon;
  min-height: 100px;
  max-height: calc(100% - 60px);
}
#aptDeal {
  background-color: lemonchiffon;
  height: calc(100% - 60px);
}
#aptMap {
  background-color: mediumseagreen;
  padding: 0;
  height: 100vh;
  z-index: 1;
}
</style>
