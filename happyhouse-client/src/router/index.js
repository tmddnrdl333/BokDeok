import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AptView from "@/views/AptView.vue";
import NoticeView from "@/views/NoticeView.vue";
import InterestView from "@/views/InterestView.vue";
import MemberView from "@/views/MemberView.vue";

import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeRegist from "@/components/notice/NoticeRegist.vue";
import NoticeDetail from "@/components/notice/NoticeDetail.vue";
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
        path: "detail",
        component: NoticeDetail,
      },
    ],
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/QnaView.vue"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnaList",
        component: () => import("@/components/qna/QnaList.vue"),
      },
      {
        path: "regist",
        name: "qnaRegist",
        component: () => import("@/components/qna/QnaRegist.vue"),
      },
      {
        path: ":qnaNo",
        name: "qnaDetail",
        component: () => import("@/components/qna/QnaDetail.vue"),
      },
      {
        path: "modify/:qnaNo",
        name: "qnaModify",
        component: () => import("@/components/qna/QnaModify.vue"),
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
