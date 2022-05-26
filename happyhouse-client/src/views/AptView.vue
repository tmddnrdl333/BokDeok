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
  max-height: calc(100vh - 30px);
  width: 380px;
  float: left;
  z-index: 1;
}
.search-bar {
  position: absolute;
  top: 0px;
  left: 10px;
  z-index: 3;
}
#aptList {
  border-radius: 5px;
  background-color: #4c4c6d;
  min-height: 100px;
  max-height: calc(100vh - 60px);
  color: white;
  /* max-height: calc(100% - 60px); */
}
#aptDeal {
  border-radius: 5px;
  background-color: #4c4c6d;
  color: white;
  height: calc(100% - 60px);
}
#aptMap {
  background-color: mediumseagreen;
  padding: 0;
  height: 100vh;
  width: calc(100vw - 65px);
  z-index: 1;
}
</style>
