<template>
  <div id="body">
    <header-nav id="header-nav"></header-nav>
    <member-nav id="member-nav"></member-nav>
    <router-view id="router-contents" />
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import MemberNav from "@/components/MemberNav.vue";
export default {
  components: { HeaderNav, MemberNav },
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
#member-nav {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 5;
}
#router-contents {
  position: absolute;
  left: 65px;
  width: calc(100vw - 80px);
  height: 100vh;
}
</style>
