package com.backend.iAttend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.repository.StudentRepository;
import com.backend.iAttend.DTO.StudentDto;
import com.backend.iAttend.services.StudentServices;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentServices studentServices;

    StudentController(StudentServices studentServices, StudentRepository studentRepository) {
        this.studentServices = studentServices;
    }

    @PostMapping("/add")
    public ResponseEntity<StudentDto> saveStudent(@RequestBody StudentDto StudentDto) {
        StudentDto student = studentServices.saveStudent(StudentDto);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentDto>> getAllStudents(){
        List<StudentDto> students=studentServices.getAllStudents();

        return ResponseEntity.ok(students);
    }

}
