<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>공지사항</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-form>
          <b-form-group label="작성자 :"
            ><b-form-input></b-form-input
          ></b-form-group>
        </b-form>
      </b-col>
      <b-col class="text-right">
        <b-button
          v-if="userInfo.id == 'admin'"
          variant="outline-primary"
          @click="moveRegist()"
          >작성하기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="notices.length">
        <b-table-simple
          hover
          responsive
          id="notice-table"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 40%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
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
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="notice-table"
          align="center"
        ></b-pagination>
      </b-col>
      <b-col v-else class="text-center">공지 목록이 없습니다.</b-col>
    </b-row>
    <div></div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const noticeStore = "noticeStore";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(noticeStore, ["notices"]),
    pagedNotices() {
      const items = this.notices;
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
    rows() {
      return this.notices.length;
    },
  },
  created() {
    console.log("NoticeList Comp.");
    this.getNotices();
  },
  methods: {
    ...mapActions(noticeStore, ["getNotices"]),
    moveRegist() {
      this.$router.push("/notice/regist");
    },
  },
};

// import Constant from "@/common/Constant.js";
// export default {
//   data() {
//     return {
//       perPage: 10,
//       currentPage: 1,
//     };
//   },
//   computed: {
//     notices() {
//       const items = this.$store.state.notices;
//       return items.slice(
//         (this.currentPage - 1) * this.perPage,
//         this.currentPage * this.perPage
//       );
//     },
//     rows() {
//       return this.$store.state.notices.length;
//     },
//   },
//   created() {
//     console.log("NoticeList Comp.");
//     this.getNotices();
//   },
//   methods: {
//     getNotices() {
//       this.$store.dispatch(Constant.GET_NOTICES);
//     },
//     moveRegist() {
//       this.$router.push("/notice/regist");
//     },
//   },
// };
</script>

<style></style>
