package com.backend.iAttend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.DTO.TeacherDto;
import com.backend.iAttend.services.TeacherService;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    private final TeacherService teacherService;
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/add")
    public ResponseEntity<TeacherDto> addTeacher(@RequestBody TeacherDto teacherdto) {
        TeacherDto teacher = teacherService.addTeacher(teacherdto);

        return ResponseEntity.ok(teacher);
    }
}
