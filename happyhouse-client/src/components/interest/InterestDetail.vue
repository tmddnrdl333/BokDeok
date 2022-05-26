<template>
  <div id="interestDetail">
    <b-container>
      <b-row style="height: 50px">
        <b-col align-self="center"
          ><button style="border: none" class="btn-outline" @click="moveList">
            &lt;
          </button></b-col
        >
        <b-col cols="9" align-self="center"
          ><h4>{{ selectInterest.houseInfo.aptName }}</h4></b-col
        >
      </b-row>
      <div id="score">
        <b-card>
          <b-row>
            <b-col cols="8"><h4>노인 복지시설</h4></b-col>
            <b-col cols="4"
              ><div class="Stars" :style="styles.sFclt"></div>
            </b-col>
          </b-row>
          <b-card-text v-if="selectInterest.nearestFclts.sFclt.length > 0">
            <div
              v-for="(item, index) in selectInterest.nearestFclts.sFclt"
              :key="index"
            >
              <b-row>
                <b-col cols="8">
                  {{ item[1].fcltName | fcltNameFilter }}
                </b-col>
                <b-col cols="4"> ({{ item[0] | distanceFilter }}m) </b-col>
              </b-row>
            </div>
          </b-card-text>
          <b-card-text v-else class="text-secondary">
            시설 정보가 없습니다.
          </b-card-text>
        </b-card>
        <b-card
          ><b-row>
            <b-col cols="8"><h4>아동 복지시설</h4></b-col>
            <b-col cols="4"
              ><div class="Stars" :style="styles.jFclt"></div
            ></b-col>
          </b-row>
          <b-card-text v-if="selectInterest.nearestFclts.jFclt.length > 0">
            <div
              v-for="(item, index) in selectInterest.nearestFclts.jFclt"
              :key="index"
            >
              <b-row>
                <b-col cols="8">
                  {{ item[1].fcltName | fcltNameFilter }}
                </b-col>
                <b-col cols="4"> ({{ item[0] | distanceFilter }}m) </b-col>
              </b-row>
            </div>
          </b-card-text>
          <b-card-text v-else class="text-secondary">
            시설 정보가 없습니다.
          </b-card-text>
        </b-card>
        <b-card>
          <b-row>
            <b-col cols="8"><h4>장애인 복지시설</h4></b-col>
            <b-col cols="4"
              ><div class="Stars" :style="styles.eFclt"></div
            ></b-col>
          </b-row>
          <b-card-text v-if="selectInterest.nearestFclts.eFclt.length > 0">
            <div
              v-for="(item, index) in selectInterest.nearestFclts.eFclt"
              :key="index"
            >
              <b-row>
                <b-col cols="8">
                  {{ item[1].fcltName | fcltNameFilter }}
                </b-col>
                <b-col cols="4"> ({{ item[0] | distanceFilter }}m) </b-col>
              </b-row>
            </div>
          </b-card-text>
          <b-card-text v-else class="text-secondary">
            시설 정보가 없습니다.
          </b-card-text>
        </b-card>
        <b-card>
          <b-row>
            <b-col cols="8"><h4>학교</h4></b-col>
            <b-col cols="4"
              ><div class="Stars" :style="styles.school"></div
            ></b-col>
          </b-row>
          <b-card-text v-if="selectInterest.school.length > 0">
            <div v-for="(item, index) in selectInterest.school" :key="index">
              <b-row>
                <b-col cols="8">
                  {{ item.place_name | fcltNameFilter }}
                </b-col>
                <b-col cols="4">
                  ({{ item.distance | distanceFilter }}m)
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <b-card-text v-else class="text-secondary">
            시설 정보가 없습니다.
          </b-card-text>
        </b-card>
        <b-card>
          <b-row>
            <b-col cols="8"><h4>병원</h4></b-col>
            <b-col cols="4"
              ><div class="Stars" :style="styles.hospital"></div
            ></b-col>
          </b-row>
          <b-card-text v-if="selectInterest.hospital.length > 0">
            <div v-for="(item, index) in selectInterest.hospital" :key="index">
              <b-row>
                <b-col cols="8">
                  {{ item.place_name | fcltNameFilter }}
                </b-col>
                <b-col cols="4">
                  ({{ item.distance | distanceFilter }}m)
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <b-card-text v-else class="text-secondary">
            시설 정보가 없습니다.
          </b-card-text>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
const interestAptStore = "interestAptStore";
export default {
  data() {
    return {
      aptCode: 0,
      styles: { sFclt: "", jFclt: "", eFclt: "", school: "", hospital: "" },
    };
  },
  computed: {
    ...mapState(interestAptStore, ["selectInterest"]),
  },
  created() {
    this.selectInterest.school.forEach((element) => {
      element["distance"] = this.getDistance(
        this.selectInterest.houseInfo.lat,
        this.selectInterest.houseInfo.lng,
        element.y,
        element.x
      );
    });
    this.selectInterest.hospital.forEach((element) => {
      element["distance"] = this.getDistance(
        this.selectInterest.houseInfo.lat,
        this.selectInterest.houseInfo.lng,
        element.y,
        element.x
      );
    });
  },
  mounted() {
    this.setStarStyle();
  },
  methods: {
    getDistance(lat1, lng1, lat2, lng2) {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lng2 - lng1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d * 1000;
    },
    moveList() {
      this.$router.push("/interest");
    },
    setStarStyle() {
      for (var key in this.selectInterest.score) {
        this.styles[key] = "--rating : " + this.selectInterest.score[key];
      }
      console.log(this.styles);
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

#score {
  height: calc(100vh - 150px);
  overflow-y: auto;
}
#deal-content {
  background-color: white;
  padding-top: 3px;
}
.font-sm {
  font-size: 85%;
}
.font-detail {
  font-size: 60%;
  justify-content: end;
  align-self: end;
}
:root {
  --star-color: rgb(198, 198, 198);
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
