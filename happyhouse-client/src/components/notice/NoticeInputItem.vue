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
            v-model="notice.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="notice.content"
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
import Constant from "@/common/Constant.js";
import axios from "axios";
// import http from "@/api/http.js";
export default {
  data() {
    return {
      noticeNo: 0,

      isUserid: false,
    };
  },
  computed: {
    notice() {
      if (this.type === "modify") return this.$store.state.notice;
      return {
        noticeNo: 0,
        userId: "",
        userName: "",
        subject: "",
        content: "",
      };
    },
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      this.noticeNo = this.$route.params.noticeNo;
      this.getnotice({ noticeNo: this.noticeNo });
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.notice.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.notice.content &&
        ((msg = "질문 내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "regist" ? this.registNotice() : this.modifyNotice();
    },
    onReset(event) {
      event.preventDefault();
      this.notice.subject = "";
      this.notice.content = "";
      // this.$router.push({ name: "boardList" });
    },
    // registNotice() {
    // http
    //   .post(`/notice/auth`, {
    //     noticeNo: this.notice.noticeNo,
    //     userId: this.notice.userId,
    //     userName: this.notice.userName,
    //     subject: this.notice.subject,
    //     content: this.notice.content,
    //     regTime: this.notice.regTime,
    //   })
    //   .then(({ data }) => {
    //     let msg = "등록 처리시 문제가 발생했습니다.";
    //     if (data === "success") {
    //       msg = "등록이 완료되었습니다.";
    //     }
    //     alert(msg);
    //     this.moveList();
    //   });
    // this.$store
    //   .dispatch(Constant.REGIST_NOTICE, { notice: this.notice })
    //   .then(() => {
    //     alert("등록에 성공하였습니다.");
    //     this.moveList();
    //   })
    //   .catch(() => alert("등록에 실패하였습니다."));
    // },
    registNotice() {
      axios
        .post("http://127.0.0.1/notice/auth", {
          noticeNo: 0,
          userId: "5678",
          userName: "zz",
          subject: "zz",
          content: "zz",
          regTime: "zz",
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    modifyNotice() {
      this.$store
        .dispatch(Constant.MODIFY_notice, { notice: this.notice })
        .then(() => {
          alert("수정에 성공하였습니다.");
          this.moveList();
        })
        .catch(() => alert("수정에 실패하였습니다."));
    },
    getnotice(notice) {
      this.$store.dispatch(Constant.GET_NOTICE, notice);
    },
    moveList() {
      this.$router.push("/notice/list");
    },
  },
};
</script>

<style></style>
