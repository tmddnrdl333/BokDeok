<template>
  <div id="interestList">
    <div
      class="d-flex align-items-center justify-content-center"
      style="height: 50px; text-align: center"
    >
      <h5>관심 아파트 목록</h5>
    </div>
    <div id="interestApts-list" v-if="interestApts.length">
      <!-- <b-form-select v-model="selected" :options="options"></b-form-select> -->
      <ul
        class="list-group"
        v-for="(interest, index) in interestApts"
        :key="interest.houseInfo.aptCode"
      >
        <li>
          <b-button z-index="1" @click="removeInterest(interest.houseInfo)"
            >X</b-button
          >
        </li>
        <li class="list-item rounded" @click="moveDetail(interest)">
          <b-row>
            <b-col cols="8"
              ><h5>{{ interest.houseInfo.aptName }}</h5>
              <p>
                {{ interest.houseInfo.sidoName }}
                {{ interest.houseInfo.gugunName }}
                {{ interest.houseInfo.dongName }}
              </p></b-col
            >
            <b-col cols="4">
              <div class="Stars" :style="styles[index]"></div>
              <p>{{ interest.score.total }}</p></b-col
            ></b-row
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const interestAptStore = "interestAptStore";
export default {
  data() {
    return {
      selected: null,
      options: [],
      styles: [],
    };
  },
  mounted() {
    this.setSelectInterest(null);
    this.sortInterestApts();
    this.setStarStyle();
  },
  computed: {
    ...mapState(interestAptStore, ["interestApts"]),
  },
  methods: {
    ...mapActions(interestAptStore, [
      "setSelectInterest",
      "removeInterestApt",
      "sortInterestApts",
    ]),
    moveDetail(interest) {
      this.$router.push("/interest/detail/" + interest.houseInfo.aptCode);
      this.setSelectInterest(interest);
    },
    removeInterest(houseInfo) {
      this.removeInterestApt(houseInfo);
    },
    setStarStyle() {
      this.interestApts.forEach((e, index) => {
        this.styles[index] = "--rating : " + e.score.total;
      });
    },
  },
};
</script>

<style>
#interestApts-list {
  position: relative;
  /* 아파트 리스트의 필터 밑부터 바닥 offset까지 */
  height: calc(100vh - 170px);
  overflow-y: scroll;
}
ul.list-group {
  list-style-type: none;
}
.list-item.rounded {
  border-radius: 10px !important;
  margin-bottom: 5px;
  background-color: #fdf6ec;
  margin-left: 5%;
  margin-right: 5%;
  padding-left: 8%;
  padding-top: 2%;
}
.list-item > * {
  margin: 1px;
}
:root {
  --star-color: #fff;
  --star-background: #fc0;
}

.Stars {
  --percent: calc(var(--rating) / 3 * 100%);

  display: inline-block;
  font-size: 20px;
  font-family: system-ui;
  line-height: 1;
}
.Stars::before {
  content: "★★★";
  letter-spacing: 1px;
  background: linear-gradient(
    90deg,
    var(--star-background) var(--percent),
    var(--star-color) var(--percent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
