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
import axios from "axios";
// import http from "@/api/http";
import Constant from "@/common/Constant.js";
export default {
  data() {
    return {
      qnaNo: 0,
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
    registQna() {
      // this.$store
      //   .dispatch(Constant.REGIST_QNA, { qna: this.qna })
      //   .then(() => {
      //     alert("등록에 성공하였습니다.");
      //     this.moveList();
      //   })
      //   .catch(() => alert("등록에 실패하였습니다."));
      console.log(this.qna);
      axios
        .post("http://localhost/qna/write", {
          subject: this.qna.subject,
          question: this.qna.question,
        })
        .then((res) => {
          console.log("store : 질문 등록에 성공하였습니다." + res);
          this.moveList();
        });
    },
    modifyQna() {
      axios
        .put(`http://localhost/qna/${this.qnaNo}`, {
          subject: this.qna.subject,
          question: this.qna.question,
        })
        .then((res) => {
          console.log("store : 수정에 성공하였습니다." + res);
          this.moveList();
        });
      // this.$store
      //   .dispatch(Constant.MODIFY_QNA, { qna: this.qna })
      //   .then(() => {
      //     alert("수정에 성공하였습니다.");
      //     this.moveList();
      //   })
      //   .catch(() => alert("수정에 실패하였습니다."));
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
