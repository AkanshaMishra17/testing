package com.sunbeam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.UserDao;
import com.sunbeam.entities.User;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public List<User> getAllUsers() {
        return userDao.findAll();
    }
}
