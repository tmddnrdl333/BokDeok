<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>공지 상세보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${notice.noticeNo}.
          ${notice.subject} </h3><div><h6>${notice.userId}</div><div>${notice.regTime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList"
          >목록</b-button
        > </b-col
      ><b-col class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyNotice"
          class="mr-2"
          >공지 수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteNotice"
          >공지 삭제</b-button
        >
      </b-col></b-row
    >
  </b-container>
</template>

<script>
// import Constant from "@/common/Constant.js";
// export default {
//   data() {
//     return {
//       noticeNo: 0,
//     };
//   },
//   computed: {
//     notice() {
//       return this.$store.state.notice;
//     },
//     message() {
//       if (this.notice.content)
//         return this.notice.content.split("\n").join("<br>");
//       return "";
//     },
//   },
//   created() {
//     console.log("NoticeDetail Comp.");
//     this.noticeNo = this.$route.params.noticeNo;
//     this.getNotice({ noticeNo: this.noticeNo });
//   },
//   methods: {
//     moveList() {
//       this.$router.push("/notice/list");
//     },
//     getNotice(notice) {
//       this.$store.dispatch(Constant.GET_NOTICE, notice);
//     },
//     moveModifyNotice() {
//       this.$router.push({ path: `/notice/modify/${this.notice.noticeNo}` });
//     },
//     deleteNotice() {
//       this.$store.dispatch(Constant.DELETE_NOTICE, { noticeNo: this.noticeNo });
//     },
//   },
// };
</script>

<style></style>
