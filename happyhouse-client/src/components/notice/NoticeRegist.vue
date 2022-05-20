<template>
  <b-container>
    <b-row>
      <b-col>
        <b-alert show><h3>공지사항 작성</h3></b-alert>
      </b-col>
    </b-row>
    <!--  -->
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="subject-group" label="제목:" label-for="subject">
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
              placeholder="공지 내용 입력..."
              rows="10"
              max-rows="15"
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary" class="m-1"
            >공지 등록</b-button
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
const noticeStore = "noticeStore";

export default {
  data() {
    return {
      notice: {
        userId: "",
        userName: "",
        subject: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.notice.userId = this.userInfo.id;
    this.notice.userName = this.userInfo.name;
  },
  methods: {
    ...mapActions(noticeStore, ["registNotice"]),
    onSubmit(event) {
      event.preventDefault();
      this.registNotice(this.notice);
      this.moveList();
    },
    onReset(event) {
      event.preventDefault();
      this.notice.subject = "";
      this.notice.content = "";
    },
    moveList() {
      this.$router.push("/notice/list");
    },
  },
};
</script>

<style></style>
