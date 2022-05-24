<template>
  <div>
    <div class="fluid-col"><apt-map></apt-map></div>
    <div class="fixed-col"><router-view></router-view></div>
    <!-- <b-container fluid>
      <b-row>
        <b-col class="col"> <apt-map></apt-map></b-col>
        <b-col class="col" cols="3"><router-view></router-view></b-col>
      </b-row>
    </b-container> -->
  </div>
</template>

<script>
import AptMap from "@/components/apt/AptMap.vue";
export default {
  components: {
    AptMap,
  },
};
</script>

<style scoped>
.col {
  padding: 0;
}
.fixed-col {
  width: 450px;
  float: left;
}
.fluid-col {
  width: calc(100% - 450px);
  float: left;
}
#aptList {
  background-color: lemonchiffon;
  height: calc(100vh - 75px);
}
#aptDeal {
  /* background-color: lemonchiffon; */
  height: calc(100vh - 75px);
}
#aptMap {
  background-color: mediumseagreen;
  padding: 0;
  height: calc(100vh - 75px);
}
</style>
