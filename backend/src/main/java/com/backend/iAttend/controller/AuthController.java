package com.backend.iAttend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.Requests.CollegeLoginRequest;
import com.backend.iAttend.Requests.StudentLoginRequest;
import com.backend.iAttend.Requests.TeacherLoginRequest;
import com.backend.iAttend.services.LoginService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final LoginService loginService;
    public AuthController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/student/login")
    public void studentLogin(@RequestBody StudentLoginRequest request) {

        loginService.studentLogin(request);
    }

    @PostMapping("/teacher/login")
    public void studentLogin(@RequestBody TeacherLoginRequest request) {
        loginService.teacherLogin(request);
    }
    
    @PostMapping("/college/login")
    public ResponseEntity<?> studentLogin(@RequestBody CollegeLoginRequest request) {
       
         return loginService.collegeLogin(request);
        
    }
}
