<template>
  <div id="body">
    <header-nav id="header-nav"></header-nav>
    <router-view id="router-contents" />
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
export default {
  components: { HeaderNav },
};
</script>

<style scoped>
#header-nav {
  position: fixed;
  width: 65px;
  height: 100vh;
  background-color: white;
  border-right-style: inset;
}
#router-contents {
  position: absolute;
  left: 65px;
  width: calc(100vw - 80px);
  height: 100vh;
}
</style>
