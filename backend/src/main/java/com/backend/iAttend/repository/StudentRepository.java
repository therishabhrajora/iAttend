package com.backend.iAttend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.iAttend.entities.Student;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    List<Student> findByCollegeId(String collegeId);
    Student findByRollNumber(String rollNumber);
    Student findByEmail(String email);
   
}

