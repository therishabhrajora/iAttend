package com.backend.iAttend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.repository.StudentRepository;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.services.StudentServices;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentServices studentServices;

    StudentController(StudentServices studentServices, StudentRepository studentRepository) {
        this.studentServices = studentServices;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents(){
        List<Student> students=studentServices.getAllStudents();

        return ResponseEntity.ok(students);
    }

}
