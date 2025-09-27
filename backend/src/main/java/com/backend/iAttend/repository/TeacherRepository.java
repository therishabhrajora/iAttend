package com.backend.iAttend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.iAttend.entities.Teacher;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {
    List<Teacher> findByCollegeId(String collegeId);
    Teacher findByEmail(String email);
}

