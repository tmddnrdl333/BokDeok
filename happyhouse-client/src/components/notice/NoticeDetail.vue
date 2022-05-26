<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div class="board-header"><h3>공지 상세보기</h3></div>
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
            <div v-html="notice.content"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" class="ml-1 mr-1" @click="moveList"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right" v-if="userInfo.id == 'admin'">
        <b-button
          variant="outline-info"
          class="ml-1 mr-1"
          @click="moveModifyNotice"
          >수정</b-button
        >
        <b-button
          variant="outline-danger"
          class="ml-1 mr-1"
          @click="removeNotice"
          >삭제</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const noticeStore = "noticeStore";

export default {
  data() {
    return {
      noticeNo: 0,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(noticeStore, ["notice"]),
  },
  created() {
    console.log("Notice Comp.");
    this.noticeNo = this.$route.params.noticeNo;
    this.getNotice(this.noticeNo);
  },
  methods: {
    ...mapActions(noticeStore, ["getNotice", "deleteNotice"]),
    moveModifyNotice() {
      this.$router.push({ path: `/notice/modify/${this.notice.noticeNo}` });
    },
    removeNotice() {
      this.deleteNotice(this.noticeNo).then(() => this.moveList());
    },
    moveList() {
      this.$router.push("/notice/list");
    },
  },
};
</script>

<style></style>
