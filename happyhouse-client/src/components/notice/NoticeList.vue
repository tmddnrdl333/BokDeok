<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>공지사항</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveRegist()"
          >작성하기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="notices.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>번호</b-th>
              <b-th>제목</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <tr v-for="notice in notices" :key="notice.noticeNo">
              <td>{{ notice.noticeNo }}</td>
              <td>
                <router-link :to="'/notice/' + notice.noticeNo">{{
                  notice.subject
                }}</router-link>
              </td>
              <td>{{ notice.userName }}</td>
              <td>{{ notice.regTime }}</td>
            </tr>
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col v-else class="text-center">공지 목록이 없습니다.</b-col>
    </b-row>
    <div></div>
  </b-container>
</template>

<script>
import Constant from "@/common/Constant.js";
export default {
  computed: {
    notices() {
      return this.$store.state.notices;
    },
  },
  created() {
    console.log("NoticeList Comp.");
    this.getNotices();
  },
  methods: {
    getNotices() {
      this.$store.dispatch(Constant.GET_NOTICES);
    },
    moveRegist() {
      this.$router.push("/notice/regist");
    },
  },
};
</script>

<style></style>
