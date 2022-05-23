import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AptView from "@/views/AptView.vue";
import NoticeView from "@/views/NoticeView.vue";
import InterestView from "@/views/InterestView.vue";
import MemberView from "@/views/MemberView.vue";
import QnaView from "@/views/QnaView.vue";

import AptList from "@/components/apt/AptList.vue";
import AptDeal from "@/components/apt/AptDeal.vue";
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
import MemberLogin from "@/components/member/MemberLogin.vue";
import MemberSignup from "@/components/member/MemberSignup.vue";
import MemberInfo from "@/components/member/MemberInfo.vue";

import store from "@/store/index.js";

Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    next("/member/login");
    // router.push("/member/login");
  } else {
    // console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/apt",
    component: AptView,
    redirect: "/apt/",
    children: [
      {
        path: "",
        component: AptList,
      },
      {
        path: "deal/:aptCode",
        component: AptDeal,
      },
    ],
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
        beforeEnter: onlyAuthUser,
        component: NoticeRegist,
      },
      {
        path: ":noticeNo",
        component: NoticeDetail,
      },
      {
        path: "modify/:noticeNo",
        beforeEnter: onlyAuthUser,
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
        beforeEnter: onlyAuthUser,
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
            beforeEnter: onlyAuthUser,
            component: QnaAnswerInput,
          },
        ],
      },
      {
        path: "modify/:qnaNo",
        beforeEnter: onlyAuthUser,
        component: QnaModify,
      },
    ],
  },
  {
    path: "/interest",
    beforeEnter: onlyAuthUser,
    component: InterestView,
  },
  {
    path: "/member",
    component: MemberView,
    children: [
      {
        path: "login",
        component: MemberLogin,
      },
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
