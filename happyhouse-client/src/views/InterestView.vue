<template>
  <div>
    <apt-map class="map-comp"></apt-map>
    <interest-main></interest-main>
  </div>
</template>

<script>
import AptMap from "@/components/apt/AptMap.vue";
import InterestMain from "@/components/interest/InterestMain.vue";
export default {
  components: {
    AptMap,
    InterestMain,
  },
};
</script>

<style>
.map-comp {
  height: 100%;
  z-index: 5;
}
</style>
