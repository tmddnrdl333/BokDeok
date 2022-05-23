<template>
  <b-row class="mt-2 mb-1">
    <b-col style="text-align: left">
      <b-form @submit.prevent="onSubmit">
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
    onSubmit() {
      this.answerQna(this.qna).then(() => this.moveDetail(this.qna.qnaNo));
    },
    moveDetail(qnaNo) {
      this.$router.push({ path: `/qna/${qnaNo}` });
    },
  },
};
</script>

<style></style>
