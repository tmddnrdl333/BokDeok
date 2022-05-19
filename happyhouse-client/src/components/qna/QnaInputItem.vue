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
        s{{ this.userInfo }}s
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeQna, getQna, modifyQna } from "@/api/qna";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      qna: {
        qnaNo: 0,
        userId: "",
        userName: "",
        subject: "",
        question: "",
        answer: "",
        regTime: "",
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
    if (this.type === "modify") {
      getQna(
        this.$route.params.qnaNo,
        ({ data }) => {
          this.qna = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    } else {
      this.qna.userid = this.userInfo.userid;
    }
  },
  methods: {
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
      writeQna(
        {
          userid: this.qna.userid,
          subject: this.qna.subject,
          question: this.qna.question,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyQna() {
      modifyQna(
        {
          qnaNo: this.qna.qnaNo,
          userid: this.qna.userid,
          subject: this.qna.subject,
          question: this.qna.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push("/qna/list");
        },
        (error) => {
          console.log(error);
        }
      );
    },

    moveList() {
      this.$router.push("/qna/list");
    },
  },
};
</script>

<style></style>
