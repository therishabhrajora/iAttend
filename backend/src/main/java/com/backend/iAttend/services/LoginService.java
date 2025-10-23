package com.backend.iAttend.services;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.StudentDto;
import com.backend.iAttend.Requests.CollegeLoginRequest;
import com.backend.iAttend.Requests.StudentLoginRequest;
import com.backend.iAttend.Requests.TeacherLoginRequest;
import com.backend.iAttend.config.JwtUtil;
import com.backend.iAttend.entities.College;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.entities.Teacher;
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
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    Logger logger = LoggerFactory.getLogger(LoginService.class);

    public LoginService(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
            CustomUserDetailService userDetailService, CollegeRepository collegeRepository,
            StudentRepository studentRepository, TeacherRepository teacherRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailService = userDetailService;
        this.collegeRepository = collegeRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    public ResponseEntity<?> studentLogin(StudentLoginRequest request) {
        try {

            System.out.println(request);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            System.out.println("✅ Authentication Success: " + authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // System.out.println("✅ UserDetails: " + userDetails);

            String token = jwtUtil.generateToken(userDetails);
            // System.out.println(token);
            Student student = studentRepository.findByEmail(userDetails.getUsername());
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            // System.out.println("college: "+college.getEmail());
            ObjectMapper objectMapper = new ObjectMapper();

            StudentDto studentDto = StudentDto.builder()
                    .collegeId(student.getCollege().getId())
                    .email(student.getEmail())
                    .name(student.getName())
                    .rollNumber(student.getRollNumber())
                    .studentClass(student.getStudentClass())
                    .build();

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            response.put("user", objectMapper.convertValue(studentDto, Map.class));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error", "authenticaion fail");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

    public ResponseEntity<?> teacherLogin(TeacherLoginRequest request) {
        try {

            System.out.println(request);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            System.out.println("✅ Authentication Success: " + authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // System.out.println("✅ UserDetails: " + userDetails);

            String token = jwtUtil.generateToken(userDetails);
            // System.out.println(token);
            Teacher teacher = teacherRepository.findByEmail(userDetails.getUsername());
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            // System.out.println("college: "+college.getEmail());
            ObjectMapper objectMapper = new ObjectMapper();

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            response.put("user", objectMapper.convertValue(teacher, Map.class));
            System.out.println(response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error", "authenticaion fail");
            return ResponseEntity.status(401).body(errorResponse);
        }

    }

    public ResponseEntity<?> collegeLogin(CollegeLoginRequest request) {
        try {
            System.out.println(request);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            System.out.println("✅ Authentication Success: " + authentication);
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
            Map<String, String> errorResponse = Map.of("error", "authenticaion fail");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

}
