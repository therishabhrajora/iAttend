package com.backend.iAttend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.backend.iAttend.entities.Attendance;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.entities.Teacher;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, String> {

    List<Attendance> findByStudentId(String student);

    List<Attendance> findByTeacherId(String teacherId);

    List<Attendance> findByDate(LocalDate date);

    // Attendance findByStudentIdAndDate(Student student, LocalDate date);

    Optional<Attendance> findByStudentAndDate(Student student, LocalDate date);

    Optional<Attendance> findByStudentAndDateAndTeacherAndSubject(Student student, LocalDate date, Teacher teacher,
            String subject);
    
    
}

