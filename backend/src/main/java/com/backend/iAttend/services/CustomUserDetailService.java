package com.backend.iAttend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.iAttend.entities.College;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.entities.Teacher;
import com.backend.iAttend.repository.CollegeRepository;
import com.backend.iAttend.repository.StudentRepository;
import com.backend.iAttend.repository.TeacherRepository;

import java.util.List;


@Service
public class CustomUserDetailService implements UserDetailsService {

    private final StudentRepository studentRepository;
    private final CollegeRepository collegeRepository;
    private final TeacherRepository teacherRepository;

    public CustomUserDetailService(StudentRepository studentRepository,
            CollegeRepository collegeRepository,
            TeacherRepository teacherRepository) {
        this.studentRepository = studentRepository;
        this.collegeRepository = collegeRepository;
        this.teacherRepository = teacherRepository;
    }

    Logger logger = LoggerFactory.getLogger(CustomUserDetailService.class);

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // ✅ 1. Check College
        College college = collegeRepository.findByEmail(email);
        if (college != null) {
            return new org.springframework.security.core.userdetails.User(
                    college.getEmail(),
                    college.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_COLLEGE")));
        }

        // ✅ 2. Check Teacher
        Teacher teacher = teacherRepository.findByEmail(email);
        if (teacher != null) {
            return new org.springframework.security.core.userdetails.User(
                    teacher.getEmail(),
                    teacher.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + teacher.getRole())) // Example: ROLE_TEACHER
            );
        }

        // ✅ 3. Check Student
        Student student = studentRepository.findByEmail(email);
        if (student != null) {
            return new org.springframework.security.core.userdetails.User(
                    student.getEmail(),
                    student.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + student.getRole())) // Example: ROLE_STUDENT
            );
        }

        // ❌ If no user found
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
