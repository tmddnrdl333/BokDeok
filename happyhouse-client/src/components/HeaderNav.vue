<template>
  <div>
    <b-nav align="center" class="w-100" id="navbar">
      <b-nav-item to="/">
        <img
          class="rounded"
          src="@/assets/logo.jpg"
          width="40px"
          height="40px"
        />
      </b-nav-item>
      <b-nav-item to="/apt" align="center">
        <img
          class="rounded"
          src="@/assets/junior.png"
          width="30px"
          height="30px"
        />
        <div class="font-sm">아파트</div>
      </b-nav-item>
      <b-nav-item to="/interest" align="center">
        <img
          class="rounded"
          src="@/assets/junior.png"
          width="30px"
          height="30px"
        />
        <div class="font-sm">관심지역</div>
      </b-nav-item>
      <b-nav-item to="/notice" align="center">
        <img
          class="rounded"
          src="@/assets/junior.png"
          width="30px"
          height="30px"
        />
        <div class="font-sm">공지</div>
      </b-nav-item>
      <b-nav-item to="/qna" align="center">
        <img
          class="rounded"
          src="@/assets/junior.png"
          width="30px"
          height="30px"
        />
        <div class="font-sm">Q&A</div>
      </b-nav-item>
    </b-nav>
    <b-nav align="center" class="w-100" id="member-nav">
      <!-- Right aligned nav items -->
      <b-dropdown dropup text="M" variant="outline-dark" class="m-2">
        <template v-if="userInfo == null">
          <b-dropdown-item class="font-sm" to="/member/login">
            로그인
          </b-dropdown-item>
          <b-dropdown-item class="font-sm" to="/member/signup">
            회원가입
          </b-dropdown-item>
        </template>
        <template v-else>
          <b-dropdown-item class="font-sm" @click="clickLogout">
            로그아웃
          </b-dropdown-item>
          <b-dropdown-item class="font-sm" to="/member/info">
            회원정보
          </b-dropdown-item>
        </template>
      </b-dropdown>
    </b-nav>
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

<style scoped>
#navbar {
  height: 400px;
  width: 70px;
}
#member-nav {
  position: absolute;
  bottom: 0vh;
  height: 70px;
  width: 70px;
}
.font-sm {
  font-size: 75%;
  width: 50px;
  height: 20px;
}
</style>
