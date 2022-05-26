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

<style>
#body {
  height: 100vh;
  width: 100vw;
  background-color: #f7f6f2;
}
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
.board-content {
  background-color: white;
  border-radius: 20px;
  padding: 10px;
}
</style>
