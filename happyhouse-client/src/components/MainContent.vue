<template>
  <!-- <div>
    <b-jumbotron
      class="m-2"
      header="Extremely Happy House"
      lead="by 김하연 & 정승욱"
    >
      <p>
        SSAFY 7기 서울 9반의 자랑, 알사모의 걸출한 인재들이 모여 Extremely
        Happy한 House를 만들어보았다.
      </p>
      <b-button variant="primary" href="#">More Info</b-button>
    </b-jumbotron>
  </div> -->
  <vue-scroll-snap :fullscreen="true">
    <b-row class="item" id="index">
      <b-col cols="8" style="height: 80vh">
        <img src="@/assets/main/index.png" alt="index" height="90%" />
      </b-col>
      <b-col cols="4" class="left">
        <h1>복덕복덕</h1>
        <br />
        <br />
        <br />
        <h4>'생기복덕'에서 유래하여,</h4>
        <h4>복과 덕을 가져다 주는 곳을 말합니다.</h4>
        <br />
        <br />
        <br />
        <br />
        <h6 class="text-secondary">
          스크롤을 내려서 서비스 소개를 확인하세요.
        </h6>
      </b-col>
    </b-row>
    <b-row class="item">
      <b-col cols="4" class="right">
        <h1>복덕복덕 사용법</h1>
        <br />
        <br />
        <br />
        <h4>집을 고를 때 어떤 부분이 가장 고민되나요?</h4>
        <br />
        <br />
        <br />
        <br />
        <h6 class="text-secondary">내려서 계속</h6>
      </b-col>
      <b-col cols="8" style="height: 80vh">
        <img src="@/assets/main/house.png" alt="index" height="90%" />
      </b-col>
    </b-row>
    <b-row class="item">
      <b-col cols="8" style="height: 80vh">
        <img src="@/assets/main/elder.png" alt="index" height="90%" />
      </b-col>
      <b-col cols="4" class="left">
        <h1>어르신들을 위한 동네</h1>
        <br />
        <br />
        <br />
        <h4>부모님, 조부모님을 모시고 계신가요?</h4>
        <br />
        <br />
        <br />
        <br />
        <h6 class="text-secondary">내려서 계속</h6>
      </b-col>
    </b-row>
    <b-row class="item">
      <b-col cols="4" class="right">
        <h1>아이들을 위한 동네</h1>
        <br />
        <br />
        <br />
        <h4>어린 자녀들을 키우고 계신가요?</h4>
        <br />
        <br />
        <br />
        <br />
        <h6 class="text-secondary">내려서 계속</h6>
      </b-col>
      <b-col cols="8" style="height: 80vh">
        <img src="@/assets/main/child.png" alt="index" height="90%" />
      </b-col>
    </b-row>
    <b-row class="item">
      <b-col cols="7" style="height: 80vh">
        <img src="@/assets/main/disordered.png" alt="index" height="90%" />
      </b-col>
      <b-col cols="5" class="left">
        <h1>몸이 불편한 분들을 위한 동네</h1>
        <br />
        <br />
        <br />
        <h4>가족 중 몸이 불편한 분이 계신가요?</h4>
        <br />
        <br />
        <br />
        <br />
        <h6 class="text-secondary">내려서 계속</h6>
      </b-col>
    </b-row>
    <b-row class="item">
      <b-col cols="6" class="right">
        <h1>복덕복덕에 오신 것을 환영합니다</h1>
        <br />
        <br />
        <br />
        <h4>여러분이 선택한 지역에서</h4>
        <h4>가장 가까운 복지 시설들의 정보를 제공해드립니다.</h4>
        <br />
        <h5>(노인 복지 시설, 아동 복지 시설, 장애인 복지 시설 등)</h5>
        <br />
        <br />
        <br />
        <h6 class="text-secondary">내려서 개발자 정보 보기</h6>
      </b-col>
      <b-col cols="6" style="height: 80vh">
        <img src="@/assets/main/map.png" alt="index" height="90%" />
      </b-col>
    </b-row>
    <b-row class="item">
      <b-col cols="8" style="height: 80vh">
        <img src="@/assets/main/team.png" alt="index" height="90%" />
      </b-col>
      <b-col cols="4" class="left">
        <h1>참여한 사람들</h1>
        <br />
        <br />
        <br />
        <h4>
          김하연 :
          <a href="https://github.com/haayun">
            <img src="@/assets/icon/github.png" width="20px" alt="" />
          </a>
          |
          <a href="https://www.instagram.com/0824_wookzzz/">
            <img src="@/assets/icon/instagram.png" width="25px" alt="" />
          </a>
        </h4>
        <h4>
          정승욱 :
          <a href="https://github.com/tmddnrdl333">
            <img src="@/assets/icon/github.png" width="20px" alt="" />
          </a>
          |
          <a href="https://www.instagram.com/0824_wookzzz/">
            <img src="@/assets/icon/instagram.png" width="25px" alt="" />
          </a>
        </h4>
        <br />
        <br />
        <h6 class="text-secondary">
          SSAFY 7기 서울 9반 최강1조 (Special thanks to 알사모)
        </h6>
        <br /><br /><br />
        <a href="#index">처음으로</a>
      </b-col>
    </b-row>
  </vue-scroll-snap>
</template>

<script>
import VueScrollSnap from "vue-scroll-snap";

export default {
  components: { VueScrollSnap },
};
</script>

<style scoped>
.item {
  /* Set the minimum height of the items to be the same as the height of the scroll-snap-container.*/
  min-height: 500px;
  align-items: center;
}
.item > * {
  text-align: center;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}

.scroll-snap-container {
  height: 500px;
  width: 500px;
}
img {
  border-radius: 20px;
}
</style>
