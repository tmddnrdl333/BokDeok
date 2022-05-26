<template>
  <div>
    <main-content id="main"></main-content>
  </div>
</template>

<script>
// @ is an alias to /src
import MainContent from "@/components/MainContent.vue";
export default {
  components: { MainContent },
};
</script>

<style scoped>
#main {
  width: 100vh;
  height: 100vh;
}
</style>
