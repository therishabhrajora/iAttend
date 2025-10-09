package com.backend.iAttend.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.AttendanceDTO;
import com.backend.iAttend.entities.Attendance;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.entities.Teacher;
import com.backend.iAttend.repository.AttendanceRepository;
import com.backend.iAttend.repository.StudentRepository;
import com.backend.iAttend.repository.TeacherRepository;

@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, StudentRepository studentRepository,
            TeacherRepository teacherRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    Logger logger = LoggerFactory.getLogger(AttendanceService.class);

    public void markAttendance(AttendanceDTO attendanceDTO) {
        String id = "ATT" + java.util.UUID.randomUUID().toString();
        Student student = studentRepository.findById(attendanceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("student not found"));
        Teacher teacher = teacherRepository.findById(attendanceDTO.getTeacherId())
                .orElseThrow(() -> new RuntimeException("teacher not found"));

        Attendance attendance = Attendance.builder()
                .id(id)
                .student(student)
                .teacher(teacher)
                .subject(attendanceDTO.getSubject())
                .date(attendanceDTO.getDate())
                .status(attendanceDTO.getStatus())
                .build();
        attendanceRepository.save(attendance);

    }

    public List<Attendance> getAttendanceByStudentId(String studentId) {
        List<Attendance> byStudentId = attendanceRepository.findByStudentId(studentId);
        return byStudentId;
    }

    public List<Attendance> getAttendanceByTeacherId(String teacherId) {
         List<Attendance> byTeacherId = attendanceRepository.findByTeacherId(teacherId);
        return byTeacherId;
    }

    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

}
