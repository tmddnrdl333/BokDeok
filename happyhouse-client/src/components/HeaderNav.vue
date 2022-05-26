<template>
  <div>
    <b-nav align="center" class="w-100" id="navbar">
      <b-nav-item to="/">
        <img
          class="rounded"
          src="@/assets/nav/logo.jpg"
          width="40px"
          height="40px"
        />
      </b-nav-item>
      <b-nav-item to="/apt" align="center">
        <img
          class="rounded"
          src="@/assets/nav/apt.png"
          width="25px"
          height="25px"
        />
        <div class="font-sm">아파트</div>
      </b-nav-item>
      <b-nav-item to="/interest" align="center">
        <img
          class="rounded"
          src="@/assets/nav/interest.png"
          width="25px"
          height="25px"
        />
        <div class="font-sm">관심지역</div>
      </b-nav-item>
      <b-nav-item to="/notice" align="center">
        <img
          class="rounded"
          src="@/assets/nav/notice.png"
          width="25px"
          height="25px"
        />
        <div class="font-sm">공지</div>
      </b-nav-item>
      <b-nav-item to="/qna" align="center">
        <img
          class="rounded"
          src="@/assets/nav/qna.png"
          width="25px"
          height="25px"
        />
        <div class="font-sm">Q&A</div>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {};
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
  font-size: 70%;
  width: 50px;
  height: 20px;
  color: black;
}
</style>
