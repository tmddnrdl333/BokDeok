<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>공지사항 수정</h3></b-alert>
      </b-col>
    </b-row>
    <!--  -->

    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit="onSubmit">
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
            >공지 수정</b-button
          >
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
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(noticeStore, ["notice"]),
  },
  created() {
    this.getNotice(this.$route.params.noticeNo);
  },
  methods: {
    ...mapActions(noticeStore, ["modifyNotice", "getNotice"]),
    onSubmit(event) {
      event.preventDefault();
      this.modifyNotice(this.notice);
      this.moveList();
    },
    moveList() {
      this.$router.push("/notice/list");
    },
  },
};
</script>

<style></style>
