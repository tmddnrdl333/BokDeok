<template>
  <div class="text-center">
    <h3 class="m-3">
      <b-icon icon="person-lines-fill"></b-icon>
      Member Service
    </h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
.member-content {
  max-height: calc(100vh - 100px);
  overflow: auto;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
}
</style>
