<template>
  <div>
    8자리 동코드 입력<input type="text" v-model="dongCode" />
    <button @click="search">update</button><br />

    <!--  -->
    <button @click="showSen">노인복지</button>
    <button @click="showJun">아동복지</button>
    <button @click="showEtc">기타복지</button>
    <button v-if="showSen || showJun || showEtc" @click="closeAll">닫기</button>
    <template v-if="seniorShow">
      <div v-for="(senior, index) in seniors" :key="index">
        <div>[No.{{ index }}]</div>
        <div>
          {{ senior.fcltAddr }} {{ senior.fcltDtl_1Addr }} <br />
          {{ senior.fcltNm }}
        </div>
      </div>
    </template>
    <template v-if="juniorShow">
      <div v-for="(junior, index) in juniors" :key="index">
        <div>[No.{{ index }}]</div>
        <div>
          {{ junior.fcltAddr }} {{ junior.fcltDtl_1Addr }}<br />
          {{ junior.fcltNm }}
        </div>
      </div>
    </template>
    <template v-if="etcShow">
      <div v-for="(etc, index) in etcs" :key="index">
        <div>[No.{{ index }}]</div>
        <div>
          {{ etc.fcltAddr }} {{ etc.fcltDtl_1Addr }}<br />
          {{ etc.fcltNm }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const interstStore = "interstStore";

export default {
  data() {
    return {
      dongCode: "1120000000",
      seniorShow: false,
      juniorShow: false,
      etcShow: false,
    };
  },
  computed: {
    ...mapState(interstStore, ["seniors", "juniors", "etcs"]),
  },
  methods: {
    ...mapActions(interstStore, ["getFclts"]),
    search() {
      this.getFclts(this.dongCode);
    },
    showSen() {
      this.juniorShow = false;
      this.etcShow = false;
      this.seniorShow = true;
    },
    showJun() {
      this.etcShow = false;
      this.seniorShow = false;
      this.juniorShow = true;
    },
    showEtc() {
      this.juniorShow = false;
      this.seniorShow = false;
      this.etcShow = true;
    },
    closeAll() {
      this.juniorShow = false;
      this.seniorShow = false;
      this.etcShow = false;
    },
  },
};

//

//
</script>

<style></style>
