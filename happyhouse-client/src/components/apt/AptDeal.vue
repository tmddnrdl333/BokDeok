<template>
  <div>
    <b-button @click="moveList">목록으로</b-button>
    <div>
      <b-container
        ><b-row
          ><b-col cols="9"
            ><h4>{{ selectHouse.houseInfo.aptName }}</h4></b-col
          ><b-col cols="3"> <b-button>관심</b-button></b-col> </b-row
        ><b-row>
          <!-- <h8>건축년도 : {{ selectHouse.houseInfo.buildYear }}</h8> -->
        </b-row>
        <b-row><h5>차트</h5></b-row>
        <b-row><h5>매매 신고 정보</h5></b-row>
        <div id="housedeal-list">
          <b-table :items="selectHouse.houseDeals" :fields="fields"></b-table>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const mapStore = "mapStore";
export default {
  data() {
    return {
      aptCode: 0,
      fields: [
        { key: "dealAmount", label: "거래금액 (만원)", sortable: true },
        { key: "area", label: "전용면적", sortable: true },
        { key: "floor", label: "층" },
      ],
    };
  },
  computed: {
    ...mapState(mapStore, ["selectHouse"]),
  },
  mounted() {
    this.aptCode = this.$route.params.aptCode;
    this.getHouseDeals(this.aptCode);
  },
  methods: {
    ...mapActions(mapStore, ["getHouseDeals"]),
    moveList() {
      // this.$router.back();
      this.$router.push("/apt");
    },
  },
};
</script>

<style>
#housedeal-list {
  position: relative;
  height: 500px;
  overflow-y: scroll;
}
</style>
