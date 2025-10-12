package com.backend.iAttend.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.iAttend.Requests.CollegeLoginRequest;
import com.backend.iAttend.Requests.StudentLoginRequest;
import com.backend.iAttend.Requests.TeacherLoginRequest;
import com.backend.iAttend.config.JwtUtil;
import com.backend.iAttend.entities.College;
import com.backend.iAttend.repository.CollegeRepository;
import com.backend.iAttend.repository.StudentRepository;
import com.backend.iAttend.repository.TeacherRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class LoginService {
    private AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailService userDetailService;
    private final CollegeRepository collegeRepository;

    Logger logger = LoggerFactory.getLogger(LoginService.class);

    public LoginService(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
            CustomUserDetailService userDetailService, CollegeRepository collegeRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailService = userDetailService;
        this.collegeRepository = collegeRepository;
    }

    public void studentLogin(StudentLoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            // System.out.println("✅ Authentication Success: " + authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // System.out.println("✅ UserDetails: " + userDetails);

        } catch (Exception e) {
            System.out.println("❌ Authentication failed: " + e.getMessage());
        }

    }

    public void teacherLogin(TeacherLoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            // System.out.println("✅ Authentication Success: " + authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // System.out.println("✅ UserDetails: " + userDetails);

        } catch (Exception e) {
            System.out.println("❌ Authentication failed: " + e.getMessage());
        }

    }

    public ResponseEntity<?> collegeLogin(CollegeLoginRequest request) {
        try {

            System.out.println(request);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            // System.out.println("✅ Authentication Success: " + authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // System.out.println("✅ UserDetails: " + userDetails);

            String token = jwtUtil.generateToken(userDetails);
            // System.out.println(token);
            College college = collegeRepository.findByEmail(userDetails.getUsername());
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            // System.out.println("college: "+college.getEmail());
            ObjectMapper objectMapper = new ObjectMapper(); 
 
            Map<String, Object> response = new HashMap<>(); 
            response.put("token", token); 
            response.put("role", role); 
            response.put("user", objectMapper.convertValue(college, Map.class));
 
            return ResponseEntity.ok(response);


        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error","authenticaion fail"); 
            return ResponseEntity.status(401).body(errorResponse);
        }
      

    }

}
