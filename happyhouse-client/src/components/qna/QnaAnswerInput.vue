<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit">
        <b-form-group id="content-group" label="답변:" label-for="answer">
          <b-form-textarea
            id="answer"
            v-model="qna.answer"
            placeholder="답변 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1"
          >답변 등록</b-button
        >
        <!-- <b-button type="submit" variant="primary" class="m-1" v-else
          >답변 수정</b-button
        > -->
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
// import Constant from "@/common/Constant.js";
// export default {
//   computed: {
//     qna() {
//       return this.$store.state.qna;
//     },
//   },
//   methods: {
//     onSubmit(event) {
//       event.preventDefault();

//       let err = true;
//       let msg = "";
//       !this.qna.answer &&
//         ((msg = "답변을 입력해주세요"),
//         (err = false),
//         this.$refs.answer.focus());

//       if (!err) alert(msg);
//       else this.writeAnswer();
//     },

//     writeAnswer() {
//       console.log(this.qna);
//       this.$store
//         .dispatch(Constant.MODIFY_QNA, { qna: this.qna })
//         .then(() => {
//           alert("답변 등록에 성공하였습니다.");
//           this.moveDetail();
//         })
//         .catch(() => alert("답변 등록에 실패하였습니다."));
//     },
//     moveDetail() {
//       this.$router.push({ path: `/qna/${this.qna.qnaNo}` });
//     },
//   },
// };
</script>

<style></style>
