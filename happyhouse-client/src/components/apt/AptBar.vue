<template>
  <div id="aptBar">
    <div id="aptHeader" style="text-align: center">
      <!--  -->
      <div id="searchBar">
        <b-collapse id="search-collapse" v-model="visible" class="m-1" visible>
          <b-form-input
            @keypress.enter="getDongList()"
            v-model="dongInput"
            type="search"
            placeholder="동 입력...."
          ></b-form-input>
          <b-list-group v-for="dongRes in dongList" :key="dongRes.dongCode">
            <b-list-group-item @click="clickDong(dongRes)">{{
              dongRes.fullName
            }}</b-list-group-item>
          </b-list-group>
        </b-collapse>
        <!-- <b-button
          :class="visible ? null : 'collapsed'"
          :aria-expanded="visible ? 'true' : 'false'"
          aria-controls="search-collapse"
          @click="visible = !visible"
        >
          검색
        </b-button> -->
      </div>
      <!--  -->
      <!--  -->
      <b-nav id="fcltIcons" vertical>
        <img
          src="@/assets/senior.png"
          width="30px"
          alt="senior"
          @click="markSenior"
        />
        <img
          src="@/assets/junior.png"
          width="30px"
          alt="junior"
          @click="markJunior"
        />
        <img
          src="@/assets/junior.png"
          width="30px"
          alt="etc"
          @click="markEtc"
        />
      </b-nav>
      <!--  -->
      <h5 v-if="dong.fullName">{{ dong.fullName }}</h5>
      <h5 v-else>아파트 목록</h5>
    </div>
    <router-view id="aptContent"></router-view>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
const api = apiInstance();
import { mapState, mapActions } from "vuex";
const mapStore = "mapStore";
export default {
  data() {
    return {
      visible: true,
      dongList: [],
      dongInput: "",
      dongRes: {},
    };
  },
  watch: {
    dongInput(newVal, oldVal) {
      if (oldVal && !newVal) {
        this.dongList = "";
      }
    },
  },
  computed: {
    ...mapState(mapStore, ["houseInfos", "dong", "filter"]),
  },
  methods: {
    ...mapActions(mapStore, ["searchDong"]),
    clickDong(dongRes) {
      this.searchDong(dongRes);
      this.visible = false;
      this.dongRes = dongRes;
      if (this.$route.path !== "/apt") {
        // 상세 조회 페이지에서 검색하면 다시 목록페이지로
        this.$router.push("/apt");
      }
    },
    getDongList() {
      this.dongList = [];
      return api
        .get(`/dongsearch`, { params: { keyword: this.dongInput } })
        .then(({ data }) => {
          this.dongList = data;
          console.log(data);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
#aptHeader {
  height: 60px;
}
#aptContent {
  position: absolute;
  top: 60px;
  height: calc(100% - 60px);
  width: 100%;
  border: 2px dotted red;
  z-index: 0;
}
#searchBar {
  height: 30px;
  z-index: 5;
}
#fcltIcons {
  position: absolute;
  top: 5px;
  right: -35px;
}
</style>
