<template>
  <div id="aptDeal">
    <div
      class="d-flex align-items-center justify-content-center"
      style="height: 50px; text-align: center"
    >
      <h5 v-if="dong.fullName">{{ dong.fullName }}</h5>
    </div>

    <div>
      <b-container>
        <b-row>
          <b-col cols="1">
            <button
              style="border: none"
              class="btn-outline-info"
              @click="moveList"
            >
              &lt;
            </button>
          </b-col>
          <b-col cols="7">
            <h4>{{ selectHouse.houseInfo.aptName | aptNameLim }}</h4>
          </b-col>
          <b-col cols="2" class="font-detail text-right">
            {{ selectHouse.houseInfo.buildYear }}년 <br />건축
          </b-col>
          <b-col cols="1">
            <b-button class="btn-sm" :pressed.sync="toggleInterest">
              <div v-if="toggleInterest">★</div>
              <div v-else>☆</div>
            </b-button>
          </b-col>
        </b-row>
        <b-tabs content-class="mt-2" fill lazy class="font-sm">
          <b-tab active title="거래가 차트">
            <div id="chart">
              <b-form-select
                v-model="selected"
                :options="options"
                size="sm"
                class="mt-3"
              >
              </b-form-select>
              <apt-deal-chart :area="selected"></apt-deal-chart>
            </div>
          </b-tab>
          <b-tab title="매매 정보">
            <div id="housedeal-list">
              <b-table
                :items="selectHouse.houseDeals"
                :fields="dealFields"
                sticky-header="440px"
                no-border-collapse
              >
              </b-table>
            </div>
          </b-tab>
          <b-tab title="주변 복지시설">
            <div id="score">
              <b-card title="노인 복지 시설">
                <b-card-text v-if="fcltCoords[0].length > 0">
                  <div v-for="(item, index) in fcltCoords[0]" :key="index">
                    <b-row>
                      <b-col cols="8">
                        {{ item[1].fcltName | fcltNameFilter }}
                      </b-col>
                      <b-col cols="4">
                        ({{ item[0] | distanceFilter }}m)
                      </b-col>
                    </b-row>
                  </div>
                </b-card-text>
                <b-card-text v-else class="text-secondary">
                  시설 정보가 없습니다.
                </b-card-text>
              </b-card>
              <b-card title="아동 복지 시설">
                <b-card-text v-if="fcltCoords[1].length > 0">
                  <div v-for="(item, index) in fcltCoords[1]" :key="index">
                    <b-row>
                      <b-col cols="8">
                        {{ item[1].fcltName | fcltNameFilter }}
                      </b-col>
                      <b-col cols="4">
                        ({{ item[0] | distanceFilter }}m)
                      </b-col>
                    </b-row>
                  </div>
                </b-card-text>
                <b-card-text v-else class="text-secondary">
                  시설 정보가 없습니다.
                </b-card-text>
              </b-card>
              <b-card title="기타 복지 시설">
                <b-card-text v-if="fcltCoords[2].length > 0">
                  <div v-for="(item, index) in fcltCoords[2]" :key="index">
                    <b-row>
                      <b-col cols="8">
                        {{ item[1].fcltName | fcltNameFilter }}
                      </b-col>
                      <b-col cols="4">
                        ({{ item[0] | distanceFilter }}m)
                      </b-col>
                    </b-row>
                  </div>
                </b-card-text>
                <b-card-text v-else class="text-secondary">
                  시설 정보가 없습니다.
                </b-card-text>
              </b-card>
            </div>
          </b-tab>
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
        const find = this.interestApts.find(
          (e) => e.houseInfo.aptCode === this.selectHouse.houseInfo.aptCode
        );
        if (find === undefined) {
          this.addInterestApt({
            houseInfo: this.selectHouse.houseInfo,
            nearestFclts: {
              sFclt: this.fcltCoords[0],
              jFclt: this.fcltCoords[1],
              eFclt: this.fcltCoords[2],
            },
          });
          // 복지시설도 추가
        }
      } else
        this.removeInterestApt({ aptCode: this.selectHouse.houseInfo.aptCode });
    },
    // test
    interestApts() {
      console.log(this.interestApts);
    },
    fcltCoords() {
      console.log(this.fcltCoords);
    },
  },
  computed: {
    ...mapState(mapStore, ["selectHouse", "dong", "fcltCoords"]),
    ...mapState(interestAptStore, ["interestApts"]),
  },
  created() {
    this.initHouseDeal();
    this.initToggleInterest();
    // 즐찾여부 가져오기
  },
  methods: {
    ...mapActions(mapStore, [
      "getHouseDeals",
      "setSelectHouse",
      "storeFcltCoords",
    ]),
    ...mapActions(interestAptStore, ["addInterestApt", "removeInterestApt"]),
    async initHouseDeal() {
      this.aptCode = this.$route.params.aptCode;
      await this.getHouseDeals(this.aptCode);
      this.initArea();
    },
    moveList() {
      this.$router.push("/apt");
      this.setSelectHouse(0);
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
        (e) => e.houseInfo.aptCode === this.selectHouse.houseInfo.aptCode
      );
      if (find !== undefined) this.toggleInterest = true;
    },
  },
  filters: {
    aptNameLim: function (aptName) {
      if (aptName.length > 8) return aptName.substr(0, 7) + "..";
      return aptName;
    },
    distanceFilter: function (dist) {
      return Math.round(dist);
    },
    fcltNameFilter: function (name) {
      if (name.length < 15) return name;
      else return name.substr(0, 13) + "...";
    },
  },
};
</script>

<style>
#housedeal-list {
  position: relative;
}
#housedeal-list > * {
  height: calc(100vh - 210px);
}
#chart {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
#score {
  height: calc(100vh - 210px);
  overflow-y: auto;
}
.font-sm {
  font-size: 85%;
}
.font-detail {
  font-size: 60%;
  justify-content: end;
  align-self: end;
}
</style>
