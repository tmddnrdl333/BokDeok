<template>
  <div>
    <b-collapse id="search-collapse" class="mt-2" visible>
      <b-form-input
        @keypress.enter="getDongList()"
        v-model="dongInput"
        type="search"
        style="width: 380px"
        placeholder="동 입력...."
      ></b-form-input>

      <template v-if="visible">
        <b-list-group
          id="search-result"
          v-for="dongRes in dongList"
          :key="dongRes.dongCode"
        >
          <b-list-group-item @click="clickDong(dongRes)">
            {{ dongRes.fullName }}
          </b-list-group-item>
        </b-list-group>
      </template>
    </b-collapse>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
const api = apiInstance();

import { mapActions } from "vuex";
const mapStore = "mapStore";

export default {
  data() {
    return {
      dongList: [],
      dongInput: "",
      dongRes: {},
      visible: false,
    };
  },
  methods: {
    ...mapActions(mapStore, ["searchDong", "getHouseInfos", "getFclts"]),
    clickDong(dongRes) {
      this.searchDong(dongRes);
      this.getHouseInfos(dongRes.dongCode);
      if (this.$route.path !== "/apt") {
        // 상세 조회 페이지에서 검색하면 다시 목록페이지로
        this.$router.push("/apt");
      }
      this.visible = false;
    },
    getDongList() {
      this.dongList = "";
      this.visible = true;
      return api
        .get(`/dongsearch`, { params: { keyword: this.dongInput } })
        .then(({ data }) => {
          this.dongList = data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
