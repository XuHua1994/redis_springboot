package com.fastech.service.impl;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fastech.base.Return;
import com.fastech.dao.UserDAO;
import com.fastech.entity.User;
import com.fastech.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private UserDAO userDAO;

	@Override
	public Return loginUser(Map<String, String> inputMap, HttpServletRequest request) {
		String username = inputMap.get("username");
		String password = inputMap.get("password");
		User user = userDAO.getLoginUser(username, password);
		if (user == null) {
			return new Return(false, "用户名或者密码错误!");
		} else {
			HttpSession session = request.getSession(true);
			session.setAttribute("username", user.getUserName());
			session.setAttribute("isLogin", "true");
			session.setMaxInactiveInterval(1 * 60);
			return new Return(true, "success");
		}
	}

}
