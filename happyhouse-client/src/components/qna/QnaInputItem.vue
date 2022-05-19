<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
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
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const qnaStore = "qnaStore";

export default {
  data() {
    return {
      qna: {
        userId: "",
        userName: "",
        subject: "",
        question: "",
        answer: "",
      },
    };
  },

  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.qna.userId = this.userInfo.id;
    this.qna.userName = this.userInfo.name;
    if (this.type === "modify") {
      this.getQna(
        this.$route.params.qnaNo,
        ({ data }) => {
          this.qna = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    }
  },
  methods: {
    ...mapActions(qnaStore, ["registQna", "modifyQna", "getQna"]),
    onSubmit(event) {
      event.preventDefault();
      let err = true;
      let msg = "";
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
      else if (this.type === "regist") {
        console.log("im here");
        console.log(this.qna);
        this.registQna(this.qna);
      } else {
        this.modifyQna();
      }
    },
    onReset(event) {
      event.preventDefault();
      // this.qna.qnaNo = 0;
      this.qna.subject = "";
      this.qna.question = "";
      // this.$router.push("/qna/list");
    },

    moveList() {
      this.$router.push("/qna/list");
    },
  },
};
</script>

<style></style>
