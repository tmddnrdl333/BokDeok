<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 게시판</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveRegist()"
          >질문하기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="qnas.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>번호</b-th>
              <b-th>제목</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <tr v-for="qna in qnas" :key="qna.quaNo">
              <td>{{ qna.qnaNo }}</td>
              <td>
                <router-link :to="'/qna/' + qna.qnaNo">{{
                  qna.subject
                }}</router-link>
              </td>
              <td>{{ qna.userName }}</td>
              <td>{{ qna.regTime }}</td>
            </tr>
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col v-else class="text-center">QnA 목록이 없습니다.</b-col>
    </b-row>
    <div></div>
  </b-container>
</template>

<script>
import Constant from "@/common/Constant.js";
export default {
  // data() {
  //   return {
  //     qnas: [],
  //   };
  // },
  computed: {
    qnas() {
      return this.$store.state.qnas;
    },
  },
  created() {
    console.log("QnaList Comp.");
    this.getQnas();
  },
  methods: {
    getQnas() {
      this.$store.dispatch(Constant.GET_QNAS);
    },
    moveRegist() {
      this.$router.push("/qna/regist");
    },
  },
};
</script>

<style></style>
