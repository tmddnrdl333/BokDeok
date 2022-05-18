<template>
  <b-row class="mb-1">
    <b-col>
      <div v-if="qna.answer">
        <b-card class="mb-2" border-variant="dark" no-body>
          <b-card-body>
            <div v-html="answer"></div>
          </b-card-body> </b-card
        ><b-button
          variant="outline-info"
          size="sm"
          @click="moveAnswerInput"
          class="mr-2"
          >답변 수정하기</b-button
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
          size="sm"
          @click="moveAnswerInput"
          class="mr-2"
          >답변하기</b-button
        >
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  computed: {
    qna() {
      return this.$store.state.qna;
    },

    answer() {
      if (this.qna.answer) return this.qna.answer.split("\n").join("<br>");
      return "";
    },
  },
  methods: {
    // getQna() {},
    moveAnswerInput() {
      this.$router.push({ path: `/qna/${this.qna.qnaNo}/answer` });
    },
  },
};
</script>

<style></style>
