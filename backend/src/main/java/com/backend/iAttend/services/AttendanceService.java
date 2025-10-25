package com.backend.iAttend.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

import jakarta.transaction.Transactional;

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

    @Transactional
    public void markAttendance(List<AttendanceDTO> attendanceDTOList) {
        for (AttendanceDTO attendanceDTO : attendanceDTOList) {

            // 1️⃣ Fetch student
            Student student = studentRepository.findById(attendanceDTO.getStudentId())
                    .orElseThrow(() -> new RuntimeException(
                            "Student not found with ID: " + attendanceDTO.getStudentId()));

            // 2️⃣ Fetch teacher
            Teacher teacher = teacherRepository.findById(attendanceDTO.getTeacherId())
                    .orElseThrow(() -> new RuntimeException(
                            "Teacher not found with ID: " + attendanceDTO.getTeacherId()));

            // 3️⃣ Check if attendance exists for this student, date, teacher, and subject
            Optional<Attendance> existingAttendanceOpt = attendanceRepository
                    .findByStudentAndDateAndTeacherAndSubject(student, attendanceDTO.getDate(),
                            teacher, attendanceDTO.getSubject());

            if (existingAttendanceOpt.isPresent()) {
                // ✅ Attendance exists → update status
                Attendance existingAttendance = existingAttendanceOpt.get();
                existingAttendance.setStatus(attendanceDTO.getStatus());
                attendanceRepository.save(existingAttendance);
            } else {
                // ✅ Create new attendance
                String idAtt = "ATT" + java.util.UUID.randomUUID().toString();
                Attendance newAttendance = new Attendance();
                newAttendance.setId(idAtt);
                newAttendance.setStudent(student);
                newAttendance.setTeacher(teacher);
                newAttendance.setSubject(attendanceDTO.getSubject() != null
                        ? attendanceDTO.getSubject()
                        : "N/A");
                newAttendance.setDate(attendanceDTO.getDate());
                newAttendance.setStatus(attendanceDTO.getStatus() != null
                        ? attendanceDTO.getStatus()
                        : "absent"); // default to absent
                attendanceRepository.save(newAttendance);
            }
        }
    }

    public List<Attendance> getAttendanceByStudentId(String studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        
               

           List<Attendance> byStudentId = attendanceRepository.findByStudentId(student.getId());
             
      
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
