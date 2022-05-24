<template>
  <div id="aptList">
    <div style="height: 50px; text-align: center">
      <h4 v-if="dong.fullName">{{ dong.fullName }}</h4>
      <h4 v-else>아파트 목록</h4>
    </div>

    <div v-if="dong.dongCode">
      <b-button
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="filter-collapse"
        @click="visible = !visible"
        >필터</b-button
      >
      <b-collapse id="filter-collapse" v-model="visible" class="mt-2" visible>
        <b-card>
          <!-- <p class="card-text">Collapse contents Here</p> -->
          <h5>가격대</h5>
          <vue-slider
            v-model="filter.price"
            :min-range="500"
            :min="0"
            :max="1200000"
            :lazy="true"
            :interval="500"
            :width="200"
            @change="changeFilter"
          ></vue-slider>
          <h5>면적</h5>
          <vue-slider
            v-model="filter.area"
            :min-range="1"
            :min="0"
            :max="500"
            :lazy="true"
            :interval="1"
            :width="200"
            @change="changeFilter"
          ></vue-slider>
        </b-card>
      </b-collapse>
    </div>
    <div id="houseinfo-list" v-if="houseInfos.length">
      <b-list-group v-for="house in houseInfos" :key="house.aptCode">
        <b-list-group-item @click="moveDetail(house)">
          <h5>{{ house.aptName }}</h5>

          <!-- <b-card
            img-height="100px"
            img-src="https://placekitten.com/100/100"
            img-left
            class="mb-3"
            ><b-card-text>{{ house.aptName }}</b-card-text></b-card
          > -->
        </b-list-group-item>
      </b-list-group>
    </div>
    <div v-else>조회된 아파트가 없습니다!</div>
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
      "getSelectHouse",
      "getFilter",
      "getHouseInfosByFilter",
    ]),
    moveDetail(house) {
      this.$router.push("/apt/deal/" + house.aptCode);
      this.getSelectHouse(house).then(() =>
        this.markers.highlightMarker(house)
      );
    },
    changeFilter() {
      this.getFilter({ price: this.filter.price, area: this.filter.area });
      this.getHouseInfosByFilter({
        dongCode: this.dong.dongCode,
        filter: { price: this.filter.price, area: this.filter.area },
      });
    },
  },
};
</script>

<style>
#houseinfo-list {
  position: relative;
  height: calc(100% - 100px);
  overflow-y: scroll;
}

.collapsed + #houseinfo-list {
  height: calc(100% - 100px);
}
</style>
