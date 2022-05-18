<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <div></div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: { userId: "", userName: "" },
    };
  },
  created() {
    console.log(sessionStorage.getItem("userId"));
  },
};
</script>

<style></style>
