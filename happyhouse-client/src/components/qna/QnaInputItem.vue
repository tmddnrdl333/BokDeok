<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <!-- <b-form-group
          id="userid-group"
          label="작성자:"
          label-for="userid"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userid"
            :disabled="isUserid"
            v-model="qna.userid"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group> -->

        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="qna.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="question-group" label="내용:" label-for="question">
          <b-form-textarea
            id="question"
            v-model="qna.question"
            placeholder="질문 내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'regist'"
          >질문 등록</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >질문 수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
// import http from "@/api/http";
import Constant from "@/common/Constant.js";
export default {
  name: "BoardInputItem",
  data() {
    return {
      qnaNo: 0,
      // qna: {
      //   qnaNo: 0,
      //   userId: "",
      //   userName: "",
      //   subject: "",
      //   question: "",
      // },
      isUserid: false,
    };
  },
  computed: {
    qna() {
      if (this.type === "modify") return this.$store.state.qna;
      return {
        qnaNo: 0,
        userId: "",
        userName: "",
        subject: "",
        question: "",
      };
    },
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      this.qnaNo = this.$route.params.qnaNo;
      this.getQna({ qnaNo: this.qnaNo });
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      // !this.qna.userId &&
      //   ((msg = "작성자 입력해주세요"),
      //   (err = false),
      //   this.$refs.userId.focus());
      // err &&
      !this.qna.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.qna.question &&
        ((msg = "질문 내용 입력해주세요"),
        (err = false),
        this.$refs.question.focus());

      if (!err) alert(msg);
      else this.type === "regist" ? this.registQna() : this.modifyQna();
    },
    onReset(event) {
      event.preventDefault();
      // this.qna.qnaNo = 0;
      this.qna.subject = "";
      this.qna.question = "";
      // this.$router.push("/qna/list");
    },
    // registQna() {
    //   http
    //     .post(`/board`, {
    //       userid: this.qna.userId,
    //       subject: this.qna.subject,
    //       question: this.qna.question,
    //     })
    //     .then(({ data }) => {
    //       let msg = "등록 처리시 문제가 발생했습니다.";
    //       if (data === "success") {
    //         msg = "등록이 완료되었습니다.";
    //       }
    //       alert(msg);
    //       this.moveList();
    //     });
    // },
    modifyQna() {
      this.$store.dispatch(Constant.MODIFY_QNA, { qna: this.qna }).then(() => {
        alert("수정에 성공하였습니다.");
        this.moveList();
      });
      // http
      //   .put(`/board/${this.qna.qnano}`, {
      //     qnano: this.qna.qnano,
      //     userid: this.qna.userid,
      //     subject: this.qna.subject,
      //     question: this.qna.question,
      //   })
      //   .then(({ data }) => {
      //     let msg = "수정 처리시 문제가 발생했습니다.";
      //     if (data === "success") {
      //       msg = "수정이 완료되었습니다.";
      //     }
      //     alert(msg);
      //     // 현재 route를 /list로 변경.
      //     this.$router.push({ name: "boardList" });
      //   });
    },
    getQna(qna) {
      this.$store.dispatch(Constant.GET_QNA, qna);
    },
    moveList() {
      this.$router.push("/qna/list");
    },
  },
};
</script>

<style></style>
