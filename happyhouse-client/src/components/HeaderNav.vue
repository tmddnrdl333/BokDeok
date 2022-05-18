<template>
  <!-- nav start -->
  <div class="container-fluid row">
    <div>
      <router-link class="nav-link" to="/"
        ><img id="logo" class="rounded" src="@/assets/logo.jpg" width="60px"
      /></router-link>
    </div>
    <div class="col">
      <nav class="m-2 navbar navbar-expand-sm bg-dark navbar-dark rounded">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/apt">아파트 조회</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/notice">공지사항</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/qna">QnA</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/interest">관심 지역</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <nav class="m-2 navbar navbar-expand-sm bg-light navbar-light rounded">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/member/login"
              >로그인</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/member/signup"
              >회원가입</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
