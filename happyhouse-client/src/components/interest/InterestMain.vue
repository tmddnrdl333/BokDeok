<template>
  <div>
    8자리 동코드 입력<input type="text" v-model="dongCode" /> <br />
    <button @click="cctv">CCTV</button>
    <button @click="test">TEST</button>
    <button @click="sclfclt">sclfclt</button>
    <!--  -->
    <template v-if="cctvShow">
      <div v-for="(cctv, index) in cctvs" :key="index">
        <div>{{ index }} : {{ cctv }}</div>
      </div>
    </template>
    <!--  -->
    <template v-if="testShow">
      <div v-for="(test, index) in tests" :key="index">
        <div>{{ index }} : {{ test }}</div>
      </div>
    </template>
    <!--  -->
    <template v-if="sclfcltShow">
      <div v-for="(sclfclt, index) in sclfclts" :key="index">
        <div>{{ index }} : {{ sclfclt }}</div>
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
      dongCode: "11200102",
      cctvShow: false,
      testShow: false,
      sclfcltShow: false,
    };
  },
  computed: {
    ...mapState(interstStore, ["cctvs", "tests", "sclfclts"]),
  },
  methods: {
    ...mapActions(interstStore, ["getCctvs", "getTests", "getSclfclts"]),
    cctv() {
      this.getCctvs(this.dongCode);
      this.cctvShow = true;
      this.testShow = false;
      this.sclfcltShow = false;
    },
    test() {
      this.getTests(this.dongCode);
      this.testShow = true;
      this.cctvShow = false;
      this.sclfcltShow = false;
    },
    sclfclt() {
      this.getSclfclts(this.dongCode);
      this.sclfcltShow = true;
      this.testShow = false;
      this.cctvShow = false;
    },
  },
};
</script>

<style></style>
