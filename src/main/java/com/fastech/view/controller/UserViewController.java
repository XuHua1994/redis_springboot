package com.fastech.view.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/adminview")
public class UserViewController {

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "welcome";
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

}
