package com.fastech.service;

import java.util.List;

import com.fastech.base.Return;
import com.fastech.entity.User;

public interface UserService {
	Return getUserById(String id);
	
	List<User> queryAll();
	
	Return findUserById(String id);
	
	int updateUser(User user);
	
	int deleteUserById(String id);
}
