package com.fastech.view.utils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.core.annotation.Order;

@Order(1)
@WebFilter(filterName = "MSecurity", urlPatterns = { "*.ftl" })
public class MyFilter implements Filter {

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
        System.out.println(request.getRequestURI());
		// 检查是否是登录页面
		if (request.getRequestURI().equals("/redis/adminview/login")) {
			filterChain.doFilter(servletRequest, servletResponse);
		} else {
			// 检测用户是否登录
			HttpSession session = request.getSession();
			String status = (String) session.getAttribute("isLogin");
			if (status == null || !status.equals("true")) {
				try {
					response.sendRedirect("login");
				} catch (Exception e) {
				}
			}
			filterChain.doFilter(servletRequest, servletResponse);
		}
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}
}