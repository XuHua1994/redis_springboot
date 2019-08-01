package com.fastech.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fastech.base.Return;
import com.fastech.service.LoginService;
import com.fastech.service.UserService;

@RestController
@RequestMapping(value = "/admin/user")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private LoginService loginService;

	@RequestMapping(value = "/getUserById")
	public Return getUserById(@RequestParam(required = false) String id) {

		return userService.findUserById(id);
	}

	@RequestMapping(value = "/getLogin",method = RequestMethod.POST)
	public Return login(@RequestParam(required = false) Map<String, String> inputMap, HttpServletRequest request) {

		return loginService.loginUser(inputMap, request);
	}

}