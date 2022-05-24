<template>
  <div>
    <b-navbar id="navbar" toggleable="sm" type="dark" variant="info">
      <b-navbar-brand
        ><router-link class="nav-link" to="/"
          ><img
            id="logo"
            class="rounded"
            src="@/assets/logo.jpg"
            width="60px" /></router-link
      ></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            ><router-link class="nav-link" to="/apt"
              >아파트</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link class="nav-link" to="/notice"
              >공지사항</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link class="nav-link" to="/qna"
              >Q&A</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link class="nav-link" to="/interest"
              >관심 지역</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="userInfo == null">
          <b-nav-item
            ><router-link class="nav-link" to="/member/login"
              >로그인</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link class="nav-link" to="/member/signup"
              >회원가입</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item
            ><b-nav-text @click="clickLogout">로그아웃</b-nav-text></b-nav-item
          >
          <b-nav-item
            ><router-link class="nav-link" to="/member/info"
              >회원정보</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
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

<style>
#navbar {
  height: 75px;
}
</style>
