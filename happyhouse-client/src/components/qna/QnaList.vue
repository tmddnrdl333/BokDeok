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
        <b-table-simple
          hover
          responsive
          id="qna-table"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 40%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
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
                <router-link :to="'/qna/' + qna.qnaNo + '/'">{{
                  qna.subject
                }}</router-link>
              </td>
              <td>{{ qna.userName }}</td>
              <td>{{ qna.regTime }}</td>
            </tr>
          </tbody>
        </b-table-simple>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="notice-table"
          align="center"
        ></b-pagination>
      </b-col>
      <b-col v-else class="text-center">QnA 목록이 없습니다.</b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const qnaStore = "qnaStore";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(qnaStore, ["qnas"]),
    pagedQnas() {
      const items = this.qnas;
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },

    rows() {
      return this.qnas.length;
    },
    // pagination 됐는지 regist 작성 후 확인 요
  },
  mounted() {
    console.log("QnaList Comp.");
    this.getQnas();
  },
  methods: {
    ...mapActions(qnaStore, ["getQnas"]),
    moveRegist() {
      this.$router.push("/qna/regist");
    },
  },
};
</script>

<style></style>
