package com.backend.iAttend.services;

import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.StudentDto;
import com.backend.iAttend.entities.College;
import com.backend.iAttend.entities.Student;

import com.backend.iAttend.repository.CollegeRepository;
import com.backend.iAttend.repository.StudentRepository;

@Service
public class StudentServices {

    private final StudentRepository studentRepository;
    private final CollegeRepository collegeRepository;

    StudentServices(StudentRepository studentRepository, CollegeRepository collegeRepository) {
        this.studentRepository = studentRepository;
        this.collegeRepository = collegeRepository;
    }

    public StudentDto saveStudent(StudentDto studentDto) {
        String id = "STU" + UUID.randomUUID().toString();
        College college = collegeRepository.findById(studentDto.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found"));
        Student student = new Student();
        student.setId(id);
        student.setCollege(college);
        student.setName(studentDto.getName());
        student.setRollNumber(studentDto.getRollNumber());
        student.setStudentClass(studentDto.getStudentClass());
        student.setEmail(studentDto.getEmail());
        student.setPassword(studentDto.getPassword());
        studentRepository.save(student);

        return StudentDto.builder()
                .collegeId(student.getCollege().getId())
                .name(student.getName())
                .rollNumber(student.getRollNumber())
                .studentClass(student.getStudentClass())
                .email(student.getEmail())
                .password("****")
                .build();
    }

    public List<StudentDto> getAllStudents() {
        List<StudentDto> students = studentRepository.findAll().stream()
            .map(student -> StudentDto.builder()
                .collegeId(student.getCollege().getId())
                .name(student.getName())
                .rollNumber(student.getRollNumber())
                .studentClass(student.getStudentClass())
                .email(student.getEmail())
                .password("****")
                .build())
            .collect(Collectors.toList());
        return students;
    }
    
}
