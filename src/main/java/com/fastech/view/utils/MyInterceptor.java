package com.fastech.view.utils;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

public class MyInterceptor implements HandlerInterceptor {
	private final Logger logger = LoggerFactory.getLogger(MyInterceptor.class);

	// 在请求处理之前进行调用（Controller方法调用之前
	@Override
	public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o)
			throws Exception {
//		System.out.println("preHandle被调用");
		if (!httpServletRequest.getRequestURI().equals("/redis/admin/user/getLogin")) {
//			String requestURI = httpServletRequest.getRequestURI();
//			System.err.println(requestURI);
			String status = (String) httpServletRequest.getSession().getAttribute("isLogin");
			if (status == null || !status.equals("true")) {
	            HttpServletResponse httpResponse = (HttpServletResponse) httpServletResponse;
	            httpServletResponse.setCharacterEncoding("UTF-8");
	            httpServletResponse.setContentType("application/json; charset=utf-8");
	            PrintWriter out = null;
	            JSONObject res = new JSONObject();
                res.put("state", false);
                res.put("msg", "当前的Session已过期，请重新登陆");
                out = httpResponse.getWriter();
                out.append(res.toString());
                logger.info("当前的Session已过期，请重新登陆");
				return false;
			}
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o,
			ModelAndView modelAndView) throws Exception {
//		System.out.println("postHandle被调用");
	}

	@Override
	public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			Object o, Exception e) throws Exception {
//		System.out.println("afterCompletion被调用");
	}
}
