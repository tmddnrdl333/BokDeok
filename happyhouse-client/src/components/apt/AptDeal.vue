<template>
  <div id="aptDeal">
    <div style="height: 50px; text-align: center">
      <h5 v-if="dong.fullName">{{ dong.fullName }}</h5>
    </div>
    <b-button @click="moveList">목록으로</b-button>
    <div>
      <b-container
        ><b-row
          ><b-col cols="9"
            ><h4>{{ selectHouse.houseInfo.aptName }}</h4></b-col
          ><b-col cols="3">
            <!-- <b-button @click="clickInterest(selectHouse.houseInfo.aptCode)"
              >관심</b-button
            > -->
            <b-button :pressed.sync="toggleInterest">관심</b-button></b-col
          > </b-row
        ><b-row> </b-row>
        <b-tabs fill content-class="mt-3" lazy>
          <b-tab title="상세 정보">
            <div>
              <b-form-select
                v-model="selected"
                :options="options"
                size="sm"
                class="mt-3"
              ></b-form-select>
              <apt-deal-chart :area="selected"></apt-deal-chart>
              <b-table
                stacked
                :items="infoTable"
                :fields="infoFields"
              ></b-table>
            </div>
          </b-tab>
          <b-tab title="매매 정보">
            <div id="housedeal-list">
              <b-table
                :items="selectHouse.houseDeals"
                :fields="dealFields"
                sticky-header
                no-border-collapse
              >
              </b-table></div
          ></b-tab>
          <b-tab title="복지시설">
            <div id="score">
              <b-card title="노인 복지 시설">
                <b-card-text> ~~~ </b-card-text>
              </b-card>
              <b-card title="아동 복지 시설">
                <b-card-text> ~~~ </b-card-text>
              </b-card>
              <b-card title="기타 복지 시설">
                <b-card-text> ~~~ </b-card-text>
              </b-card>
            </div></b-tab
          >
        </b-tabs>
      </b-container>
    </div>
  </div>
</template>

<script>
import AptDealChart from "@/components/apt/AptDealChart.vue";
import { mapState, mapActions } from "vuex";

const mapStore = "mapStore";
const interestAptStore = "interestAptStore";
export default {
  components: {
    AptDealChart,
  },
  data() {
    return {
      aptCode: 0,
      dealFields: [
        //, sortable: true
        { key: "dealAmount", label: "거래금액 (만원)" },
        { key: "area", label: "전용면적 (㎡)" },
        { key: "floor", label: "층" },
      ],
      infoFields: [
        { key: "jibun", label: "지번" },
        { key: "buildYear", label: "건축년도" },
        { key: "recentPrice", label: "최근 거래액(만원)" },
      ],
      infoTable: [],
      selected: null,
      options: [],
      toggleInterest: false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.initHouseDeal();
      }
    },
    toggleInterest() {
      if (this.toggleInterest === true) {
        this.addInterestApt({ aptCode: this.selectHouse.houseInfo.aptCode });
      } else {
        this.removeInterestApt({ aptCode: this.selectHouse.houseInfo.aptCode });
      }
    },
  },
  computed: {
    ...mapState(mapStore, ["selectHouse", "dong"]),
    ...mapState(interestAptStore, ["interestApts"]),
  },
  created() {
    this.initHouseDeal();
    this.initToggleInterest();
  },
  methods: {
    ...mapActions(mapStore, ["getHouseDeals"]),
    ...mapActions(interestAptStore, ["addInterestApt", "removeInterestApt"]),
    async initHouseDeal() {
      this.aptCode = this.$route.params.aptCode;
      this.infoTable[0] = this.selectHouse.houseInfo;
      await this.getHouseDeals(this.aptCode);
      this.initArea();
    },
    moveList() {
      // this.$router.back();
      this.$router.push("/apt");
    },
    initArea() {
      this.options = [];
      const result = [
        ...new Set(
          this.selectHouse.houseDeals.map(({ area }) => Math.round(area / 3.3))
        ),
      ];
      this.options = result.map((res) => {
        const obj = {};
        obj["value"] = res;
        obj["text"] = res + "평";
        return obj;
      });
      this.options.sort((a, b) => a.value - b.value);
      this.selected = this.options[0].value;
    },
    initToggleInterest() {
      const find = this.interestApts.find(
        (e) => e === this.selectHouse.houseInfo.aptCode
      );
      if (find !== undefined) this.toggleInterest = true;
    },
  },
};
</script>

<style>
#housedeal-list {
  position: relative;
  height: 100%;
  overflow-y: scroll;
}
</style>
