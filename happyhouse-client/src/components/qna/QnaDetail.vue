<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 상세보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${qna.qnaNo}.
          ${qna.subject} </h3><div><h6>${qna.userId}</div><div>${qna.regTime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="qna.question"></div>
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
          @click="moveModifyQna"
          class="mr-2"
          v-if="userInfo.id == qna.userId"
          >수정</b-button
        >
        <b-button
          variant="outline-danger"
          @click="removeQna"
          v-if="userInfo.id == qna.userId || userInfo.id == 'admin'"
          >삭제</b-button
        >
      </b-col></b-row
    >
    <router-view :answer="this.qna.answer"></router-view>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const qnaStore = "qnaStore";

export default {
  data() {
    return {
      qnaNo: 0,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(qnaStore, ["qna"]),
  },
  created() {
    console.log("Qna Comp.");
    this.qnaNo = this.$route.params.qnaNo;
    this.getQna(this.qnaNo);
  },
  methods: {
    ...mapActions(qnaStore, ["getQna", "deleteQna"]),
    moveModifyQna() {
      this.$router.push(`/qna/modify/${this.qna.qnaNo}`);
    },
    moveAnswerQna() {
      this.$router.push(`/qna/${this.qna.qnaNo}/answer`);
    },
    removeQna() {
      this.deleteQna(this.qnaNo).then(() => this.moveList());
    },
    moveList() {
      this.$router.push("/qna/list");
    },
  },
};
</script>

<style></style>
