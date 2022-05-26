<template>
  <div id="aptList">
    <div
      class="d-flex align-items-center justify-content-center"
      style="height: 50px; text-align: center"
    >
      <h5 v-if="dong && dong.fullName">{{ dong.fullName }}</h5>
      <h5 v-else>아파트 목록</h5>
    </div>

    <template v-if="dong.dongCode">
      <b-card id="filter-card">
        <b-row>
          <b-col md="6">
            <h6 class="slider-title">가격대</h6>
            <vue-slider
              v-model="filter.price"
              :min-range="500"
              :min="0"
              :max="1200000"
              :lazy="true"
              :interval="500"
              :width="150"
              @change="changeFilter"
            >
            </vue-slider>
          </b-col>
          <b-col md="6">
            <h6 class="slider-title">면적</h6>
            <vue-slider
              v-model="filter.area"
              :min-range="1"
              :min="0"
              :max="500"
              :lazy="true"
              :interval="1"
              :width="150"
              @change="changeFilter"
            ></vue-slider></b-col
        ></b-row>
      </b-card>
    </template>
    <div id="houseinfo-list" v-if="houseInfos.length">
      <b-list-group v-for="house in houseInfos" :key="house.aptCode">
        <b-list-group-item class="list-item" @click="moveDetail(house)">
          {{ house.aptName }}
        </b-list-group-item>
      </b-list-group>
    </div>
    <b-card v-else class="text-secondary" style="background-color: snow"
      >조회된 아파트가 없습니다!</b-card
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
const mapStore = "mapStore";
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState(mapStore, ["houseInfos", "dong", "filter"]),
  },
  methods: {
    ...mapActions(mapStore, [
      "setSelectHouse",
      "setFilter",
      "getHouseInfosByFilter",
      "highlightMarker",
    ]),
    moveDetail(house) {
      this.$router.push("/apt/deal/" + house.aptCode);
      this.setSelectHouse(house);
    },
    changeFilter() {
      this.setFilter({ price: this.filter.price, area: this.filter.area });
      this.getHouseInfosByFilter({
        dongCode: this.dong.dongCode,
        filter: { price: this.filter.price, area: this.filter.area },
      });
    },
  },
};
</script>

<style scoped>
#houseinfo-list {
  position: relative;
  /* 아파트 리스트의 필터 밑부터 바닥 offset까지 */
  height: calc(100vh - 170px);
  overflow-y: scroll;
  color: black;
}

.slider-title {
  text-align: center;
}
#filter-card {
  background-color: #e8f6ef;
  color: black;
}
#filter-card > * {
  margin: 0px 20px;
  padding: 5px;
}
.list-item {
  background-color: snow;
  margin: 3px 2px 0px;
}
</style>
