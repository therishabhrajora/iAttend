package com.backend.iAttend.services;

import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.TeacherDto;

@Service
public class TeacherService {

    public TeacherDto addTeacher(TeacherDto teacherdto) {
        String id="TC"+java.util.UUID.randomUUID().toString();
        
    }

}
