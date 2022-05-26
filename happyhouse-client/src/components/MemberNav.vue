<template>
  <b-nav align="center" class="w-5" id="member-nav">
    <!-- Right aligned nav items -->
    <b-dropdown size="lg" dropdown right text="M" variant="dark" class="m-2">
      <template v-if="userInfo == null">
        <b-dropdown-item to="/member/login"> 로그인 </b-dropdown-item>
        <b-dropdown-item to="/member/signup"> 회원가입 </b-dropdown-item>
      </template>
      <template v-else>
        <b-dropdown-item @click="clickLogout"> 로그아웃 </b-dropdown-item>
        <b-dropdown-item to="/member/info"> 회원정보 </b-dropdown-item>
      </template>
    </b-dropdown>
  </b-nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["logout"]),
    clickLogout() {
      this.logout();
      alert("로그아웃되었습니다!");
    },
  },
};
</script>

<style></style>
