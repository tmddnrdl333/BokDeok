package com.ssafy.happyhouse.controller.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ssafy.happyhouse.model.MemberDto;

@SuppressWarnings("deprecation")
public class LoginCheckInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HttpSession session = request.getSession();
//		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
		String userId = (String) session.getAttribute("userId");
		String userName = (String) session.getAttribute("userName");
		if (userId == null || userName == null) {
//			request.setAttribute("errorMsg", "로그인이 필요합니다!!");
//			request.getRequestDispatcher("/WEB-INF/views/notice.jsp").forward(request, response);
			response.sendRedirect("/");
			return false;
		}
		return true;
	}
}
