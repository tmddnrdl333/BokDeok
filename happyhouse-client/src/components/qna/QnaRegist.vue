<template>
  <b-container>
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 질문 작성</h3></b-alert>
      </b-col>
    </b-row>
    <qna-input-item type="regist" />
  </b-container>
</template>

<script>
import QnaInputItem from "@/components/qna/QnaInputItem.vue";
export default {
  components: {
    QnaInputItem,
  },
};
</script>

<style></style>
