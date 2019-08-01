package com.fastech.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.ModelMap;

import com.fastech.base.Return;

public interface LoginService {
	Return loginUser(Map<String, String> inputMap,HttpServletRequest request);
}
