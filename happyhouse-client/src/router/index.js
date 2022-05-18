import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AptView from "@/views/AptView.vue";
import NoticeView from "@/views/NoticeView.vue";
import InterestView from "@/views/InterestView.vue";
import MemberView from "@/views/MemberView.vue";
import QnaView from "@/views/QnaView.vue";

import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeRegist from "@/components/notice/NoticeRegist.vue";
import NoticeDetail from "@/components/notice/NoticeDetail.vue";
import NoticeModify from "@/components/notice/NoticeModify.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaRegist from "@/components/qna/QnaRegist.vue";
import QnaDetail from "@/components/qna/QnaDetail.vue";
import QnaModify from "@/components/qna/QnaModify.vue";
import QnaAnswer from "@/components/qna/QnaAnswer.vue";
import QnaAnswerInput from "@/components/qna/QnaAnswerInput.vue";
import MemberSignup from "@/components/member/MemberSignup.vue";
import MemberInfo from "@/components/member/MemberInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/apt",
    component: AptView,
  },
  {
    path: "/notice",
    component: NoticeView,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        component: NoticeList,
      },
      {
        path: "regist",
        component: NoticeRegist,
      },
      {
        path: ":noticeNo",
        component: NoticeDetail,
      },
      {
        path: "modify/:noticeNo",
        component: NoticeModify,
      },
    ],
  },
  {
    path: "/qna",
    name: "qna",
    component: QnaView,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        component: QnaList,
      },
      {
        path: "regist",
        component: QnaRegist,
      },
      {
        path: ":qnaNo",
        component: QnaDetail,
        children: [
          {
            path: "",
            component: QnaAnswer,
          },
          {
            path: "answer",
            component: QnaAnswerInput,
          },
        ],
      },
      {
        path: "modify/:qnaNo",
        component: QnaModify,
      },
    ],
  },
  {
    path: "/interest",
    component: InterestView,
  },
  {
    path: "/member",
    component: MemberView,
    children: [
      {
        path: "signup",
        component: MemberSignup,
      },
      {
        path: "info",
        component: MemberInfo,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
