<template>
  <div id="interestDetail">
    <b-container>
      <b-row>
        <b-col
          ><h4>{{ selectInterest.houseInfo.aptName }}</h4></b-col
        >
      </b-row>
      <b-card title="노인 복지시설">
        <b-card-text> </b-card-text>
      </b-card>
      <b-card title="아동 복지시설">
        <b-card-text> </b-card-text>
      </b-card>
      <b-card title="장애인 복지시설">
        <b-card-text> </b-card-text>
      </b-card>
      <b-card title="학교">
        <b-card-text> </b-card-text>
      </b-card>
      <b-card title="병원">
        <b-card-text> </b-card-text>
      </b-card>
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
    };
  },
  computed: {
    ...mapState(interestAptStore, ["selectInterest"]),
  },
  methods: {},
};
</script>

<style></style>
