package com.backend.iAttend.services;

import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.TeacherDto;

@Service
public class TeacherService {

    public String addTeacher(TeacherDto teacherdto) {
        String teacherid="TC"+java.util.UUID.randomUUID().toString();

        return "";
        
    }

}
