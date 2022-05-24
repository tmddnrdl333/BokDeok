<template>
  <div id="body">
    <header-nav></header-nav>
    <router-view />
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
export default {
  components: { HeaderNav },
};
</script>

<style></style>
