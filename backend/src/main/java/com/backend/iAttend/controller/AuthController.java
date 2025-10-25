package com.backend.iAttend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.DTO.CollegeDto;
import com.backend.iAttend.DTO.OtpRequest;
import com.backend.iAttend.DTO.StudentDto;
import com.backend.iAttend.DTO.TeacherDto;
import com.backend.iAttend.Requests.CollegeLoginRequest;
import com.backend.iAttend.Requests.StudentLoginRequest;
import com.backend.iAttend.Requests.TeacherLoginRequest;
import com.backend.iAttend.entities.Teacher;
import com.backend.iAttend.services.CollegeService;
import com.backend.iAttend.services.EmailService;
import com.backend.iAttend.services.LoginService;
import com.backend.iAttend.services.StudentServices;
import com.backend.iAttend.services.TeacherService;

import jakarta.validation.constraints.Email;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final LoginService loginService;
    private final StudentServices studentServices;
    private final TeacherService teacherService;
    private final CollegeService collegeService;
    private final EmailService emailService;

    public AuthController(LoginService loginService, CollegeService collegeService, StudentServices studentServices,
            TeacherService teacherService, EmailService emailService) {
        this.loginService = loginService;
        this.studentServices = studentServices;
        this.teacherService = teacherService;
        this.collegeService = collegeService;
        this.emailService = emailService;
    }

    @PostMapping("/student/login")
    public ResponseEntity<?> studentLogin(@RequestBody StudentLoginRequest request) {

        ResponseEntity<?> studentLogin = loginService.studentLogin(request);
        return studentLogin;
    }

    @PostMapping("/teacher/login")
    public ResponseEntity<?> teacherLogin(@RequestBody TeacherLoginRequest request) {
        ResponseEntity<?> teacherLogin = loginService.teacherLogin(request);
        return teacherLogin;
    }

    @PostMapping("/college/login")
    public ResponseEntity<?> collegeLogin(@RequestBody CollegeLoginRequest request) {
        // System.out.println(request);
        return loginService.collegeLogin(request);

    }

    @PostMapping("/college/register")
    public ResponseEntity<CollegeDto> postMethodName(@RequestBody CollegeDto collegedto) {
        CollegeDto college = collegeService.addCollege(collegedto);

        return ResponseEntity.ok(college);
    }

    @PostMapping("/student/register")
    public ResponseEntity<StudentDto> saveStudent(@RequestBody StudentDto studentDto) {
        StudentDto student = studentServices.saveStudent(studentDto);
        return ResponseEntity.ok(student);
    }

    @PostMapping("/teacher/register")
    public ResponseEntity<TeacherDto> addTeacher(@RequestBody TeacherDto teacherdto) {
        TeacherDto teacher = teacherService.addTeacher(teacherdto);

        return ResponseEntity.ok(teacher);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest otpRequest) {
        String email = otpRequest.getEmail();
        String otp = otpRequest.getOtp();

        ResponseEntity<?> verifyOtpProcess = loginService.verifyOtpProcess(email, otp);
        return verifyOtpProcess;

    }

}
