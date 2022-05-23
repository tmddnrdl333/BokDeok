<template>
  <b-container>
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 질문 작성</h3></b-alert>
      </b-col>
    </b-row>
    <!--  -->
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group id="subject-group" label="제목:" label-for="subject">
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
              required
              placeholder="질문 내용 입력..."
              rows="10"
              max-rows="15"
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary" class="m-1"
            >질문 등록</b-button
          >
          <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
        </b-form>
      </b-col>
    </b-row>
    <!--  -->
  </b-container>
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
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.qna.userId = this.userInfo.id;
    this.qna.userName = this.userInfo.name;
  },
  methods: {
    ...mapActions(qnaStore, ["registQna"]),
    onSubmit() {
      this.registQna(this.qna).then(() => this.moveList());
    },
    onReset() {
      this.qna.subject = "";
      this.qna.question = "";
    },
    moveList() {
      this.$router.push("/qna/list");
    },
  },
};
</script>

<style></style>
