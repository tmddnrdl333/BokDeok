<template>
  <b-row class="mb-1">
    <b-col>
      <div v-if="answer">
        <b-card class="mt-1 mb-2" border-variant="dark" no-body>
          <b-card-body>
            <div v-html="answer"></div>
          </b-card-body> </b-card
        ><b-button
          variant="outline-secondary"
          @click="moveAnswerInput"
          class="mr-2"
          v-if="userInfo.id == 'admin'"
          >답변 수정</b-button
        >
      </div>
      <div v-else class="mx-auto">
        <b-card class="mb-2" border-variant="dark" no-body>
          <div>
            <b-card-body class="text-center">
              <div>답변이 없습니다!</div>
            </b-card-body>
          </div> </b-card
        ><b-button
          variant="outline-info"
          @click="moveAnswerInput"
          class="mr-2"
          v-if="userInfo.id == 'admin'"
          >답변하기</b-button
        >
      </div>
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
  created() {
    console.log("QnaAnswer Comp.");
    this.qnaNo = this.$route.params.qnaNo;
  },
  // updated() {
  //   this.getQna(this.qnaNo);
  //   this.answer = this.qna.answer;
  // },
  methods: {
    ...mapActions(qnaStore, ["getQna"]),

    moveAnswerInput() {
      this.$router.push({ path: `/qna/${this.qna.qnaNo}/answer` });
    },
  },
};
</script>

<style></style>
