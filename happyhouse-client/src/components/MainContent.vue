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
    <div class="item">
      <img class="left" src="@/assets/main/house.png" alt="" height="80%" />
    </div>
    <div class="item">
      <img class="right" src="@/assets/main/elder.png" alt="" height="80%" />
    </div>
    <div class="item">
      <img class="left" src="@/assets/main/child.png" alt="" height="80%" />
    </div>
    <div class="item">
      <img
        class="right"
        src="@/assets/main/disordered.png"
        alt=""
        height="80%"
      />
    </div>
    <div class="item">
      <img class="left" src="@/assets/main/map.png" alt="" height="80%" />
    </div>
    <div class="item">
      <img src="@/assets/main/team.png" alt="" height="80%" />
    </div>
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
  width: 100%;
  border: 1px solid red;
}

img {
  position: relative;
  border-radius: 30px !important;
  top: 80px;
}
.left {
  left: 50px;
}
.right {
}
</style>
