package com.backend.iAttend.services;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.TeacherDto;
import com.backend.iAttend.entities.College;
import com.backend.iAttend.entities.Teacher;
import com.backend.iAttend.enums.Role;
import com.backend.iAttend.repository.CollegeRepository;
import com.backend.iAttend.repository.TeacherRepository;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final CollegeRepository collegeRepository;
    private PasswordEncoder passswordEncoder;

    public TeacherService(TeacherRepository teacherRepository, CollegeRepository collegeRepository,PasswordEncoder passswordEncoder) {
        this.teacherRepository = teacherRepository;
        this.collegeRepository = collegeRepository;
        this.passswordEncoder = passswordEncoder;
    }

    public TeacherDto addTeacher(TeacherDto teacherdto) {
        String id="TC"+UUID.randomUUID().toString();

        College college=collegeRepository.findById(teacherdto.getCollegeId()).orElseThrow(()->new RuntimeException("College not found"));
   
        Teacher teacher=new Teacher();
        teacher.setId(id);
        teacher.setName(teacherdto.getName());
        teacher.setEmail(teacherdto.getEmail());
        teacher.setTeacherId(teacherdto.getTeacherId());
        teacher.setPassword(passswordEncoder.encode(teacherdto.getPassword()));
        teacher.setSubject(teacherdto.getSubject());
        teacher.setCollege(college);

        
        if(teacherRepository.count()==0){
            teacher.setRole(Role.ADMIN.name());
        }else{
            teacher.setRole(Role.FACULTY.name());
        }

        teacherRepository.save(teacher);

        return TeacherDto.builder()
                .collegeId(teacher.getCollege().getId())
                .name(teacher.getName())
                .email(teacher.getEmail())
                .teacherId(teacher.getTeacherId())
                .subject(teacher.getSubject())
                .build();       
    }

    public List<TeacherDto> getAllTeachers() {
        List<TeacherDto> teachers=teacherRepository.findAll().stream()
        .map(college-> TeacherDto.builder()
            .collegeId(college.getCollege().getId())
            .name(college.getName())
            .email(college.getEmail())
            .teacherId(college.getTeacherId())
            .subject(college.getSubject())
            .build())
        .sorted(Comparator.comparing(TeacherDto::getTeacherId))
        .collect(Collectors.toList());

        return teachers;
    }




}
