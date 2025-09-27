package com.backend.iAttend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.iAttend.entities.Attendance;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    List<Attendance> findByTeacherId(Long teacherId);
    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);
}

