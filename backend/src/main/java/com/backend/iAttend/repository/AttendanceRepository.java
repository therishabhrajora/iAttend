package com.backend.iAttend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.iAttend.entities.Attendance;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, String> {
    List<Attendance> findByStudentId(String studentId);
    List<Attendance> findByTeacherId(String teacherId);
    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByStudentIdAndDate(String studentId, LocalDate date);
}

