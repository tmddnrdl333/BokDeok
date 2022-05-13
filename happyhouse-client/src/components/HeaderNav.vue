<template>
  <!-- nav start -->
  <div class="container-fluid row">
    <div>
      <a class="nav-link" href="/">
        <img id="logo" class="rounded" src="@/assets/logo.jpg" width="60px"
      /></a>
    </div>
    <div class="col">
      <nav class="m-2 navbar navbar-expand-sm bg-dark navbar-dark rounded">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/apt">아파트 조회</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/notice">공지사항</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/interest">관심 지역</a>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <nav class="m-2 navbar navbar-expand-sm bg-light navbar-light rounded">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">로그인</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">회원가입</a>
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
