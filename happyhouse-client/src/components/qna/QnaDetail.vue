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
          @click="moveModifyQna"
          class="mr-2"
          >질문 수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteQna"
          >질문 삭제</b-button
        >
      </b-col></b-row
    >
  </b-container>
</template>

<script>
import Constant from "@/common/Constant.js";
export default {
  data() {
    return {
      qnaNo: 0,
    };
  },
  computed: {
    qna() {
      return this.$store.state.qna;
    },
    message() {
      if (this.qna.question) return this.qna.question.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    console.log("QnaDetail Comp.");
    this.qnaNo = this.$route.params.qnaNo;
    this.getQna({ qnaNo: this.qnaNo });
  },
  methods: {
    moveList() {
      this.$router.push("/qna/list");
    },
    getQna(qna) {
      this.$store.dispatch(Constant.GET_QNA, qna);
    },
    moveModifyQna() {
      this.$router.replace({
        name: "qnaModify",
        params: { qnaNo: this.qna.qnaNo },
      });
      //   this.$router.push({ path: `/board/modify/${this.qna.qnano}` });
    },
    // deleteQna() {
    //   axios.delete(`http://127.0.0.1:8080/qna/${this.qnaNo}`).then(() => {
    //     alert("QnA 삭제에 성공하였습니다.");
    //     this.moveList();
    //   });
    // },
  },
};
</script>

<style></style>
