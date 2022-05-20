<template>
  <b-row class="mt-2 mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit">
        <b-form-group id="content-group" label="답변:" label-for="answer">
          <b-form-textarea
            id="answer"
            v-model="qna.answer"
            required
            placeholder="답변 입력..."
            rows="5"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="outline-primary" class="m-1"
          >등록</b-button
        >
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const qnaStore = "qnaStore";

export default {
  props: ["answer"],
  data() {
    return {
      qnaNo: 0,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(qnaStore, ["qna"]),
  },
  methods: {
    ...mapActions(qnaStore, ["answerQna"]),

    moveAnswerInput() {
      this.$router.push({ path: `/qna/${this.qna.qnaNo}/answer` });
    },
    onSubmit(event) {
      event.preventDefault();
      this.answerQna(this.qna);
      this.$router.push({ path: `/qna/${this.qna.qnaNo}/` });
    },

    // writeAnswer() {
    //   console.log(this.qna);
    //   this.$store
    //     .dispatch(Constant.MODIFY_QNA, { qna: this.qna })
    //     .then(() => {
    //       alert("답변 등록에 성공하였습니다.");
    //       this.moveDetail();
    //     })
    //     .catch(() => alert("답변 등록에 실패하였습니다."));
    // },
    moveDetail() {
      this.$router.push({ path: `/qna/${this.qna.qnaNo}` });
    },
  },
};
</script>

<style></style>
