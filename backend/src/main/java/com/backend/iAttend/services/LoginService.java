package com.backend.iAttend.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.StudentDto;
import com.backend.iAttend.DTO.TeacherDto;
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
    // private final EmailService emailService;

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

            // System.out.println(request);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            // System.out.println("✅ Authentication Success: " + authentication);

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

    // public ResponseEntity<?> teacherLogin(TeacherLoginRequest request) {
    // try {

    // System.out.println(request);
    // Authentication authentication = authenticationManager.authenticate(
    // new UsernamePasswordAuthenticationToken(request.getEmail(),
    // request.getPassword()));
    // // System.out.println("✅ Authentication Success: " + authentication);

    // SecurityContextHolder.getContext().setAuthentication(authentication);
    // UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    // // System.out.println("✅ UserDetails: " + userDetails);

    // String token = jwtUtil.generateToken(userDetails);
    // // System.out.println(token);
    // Teacher teacher = teacherRepository.findByEmail(userDetails.getUsername());
    // String role = userDetails.getAuthorities().iterator().next().getAuthority();

    // // System.out.println("college: "+college.getEmail());
    // ObjectMapper objectMapper = new ObjectMapper();
    // emailService.sendOtpToUser(request.getEmail());

    // Map<String, Object> response = new HashMap<>();
    // response.put("token", token);
    // response.put("role", role);
    // response.put("user", objectMapper.convertValue(teacher, Map.class));
    // System.out.println(response);
    // return ResponseEntity.ok(response);

    // } catch (Exception e) {
    // Map<String, String> errorResponse = Map.of("error", "authenticaion fail");
    // return ResponseEntity.status(401).body(errorResponse);
    // }

    // }

    public ResponseEntity<?> teacherLogin(TeacherLoginRequest request) {
        try {
            // 1. Authenticate credentials directly using Email and Password
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 2. Generate JWT Token immediately
            String token = jwtUtil.generateToken(userDetails);
            Teacher teacher = teacherRepository.findByEmail(request.getEmail());
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            // 3. Build the Data Transfer Object (Adjust fields based on your TeacherDto
            // definition)
            TeacherDto teacherDto = TeacherDto.builder()
                    .collegeId(teacher.getCollege().getId())
                    .email(teacher.getEmail())
                    .name(teacher.getName())
                    .build();

            // 4. Construct direct response map
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            response.put("user", teacherDto); // Spring handles JSON serialization automatically

            logger.info("Teacher successfully logged in: {}", request.getEmail());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error", "Authentication failed");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

    public ResponseEntity<?> collegeLogin(CollegeLoginRequest request) {
        try {
            // 1. Authenticate credentials directly using Email and Password
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 2. Generate JWT Token immediately
            String token = jwtUtil.generateToken(userDetails);
            College college = collegeRepository.findByEmail(userDetails.getUsername());
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            // 3. Construct direct response map (Spring handles serialization automatically)
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            response.put("user", college); // Direct object passing instead of ObjectMapper.convertValue

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Fixed typo: "authenticaion fail" -> "Authentication failed"
            Map<String, String> errorResponse = Map.of("error", "Authentication failed");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

}
