package com.backend.iAttend.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.DTO.AttendanceDTO;
import com.backend.iAttend.entities.Attendance;
import com.backend.iAttend.services.AttendanceService;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attandanceService) {
        this.attendanceService = attandanceService;
    }

    @PutMapping("/mark")
    public ResponseEntity<String> markAttendance(@RequestBody List<AttendanceDTO> attendanceDTOList) {
        attendanceService.markAttendance(attendanceDTOList);
        return ResponseEntity.ok("Attendance marked successfully");

    }

    @GetMapping("/stu/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendanceByStudentId(@PathVariable String studentId) {
       //System.out.println("Fetching attendance for student ID: " + studentId);
        List<Attendance> attendanceByStudentId = attendanceService.getAttendanceByStudentId(studentId);
        return ResponseEntity.ok().body(attendanceByStudentId);
    }

    @GetMapping("/teacher/{teacherId}")
    public List<Attendance> getAttendanceByTeacherId(@PathVariable String teacherId) {

        List<Attendance> attendanceByTeacherId = attendanceService.getAttendanceByTeacherId(teacherId);
        return attendanceByTeacherId;
    }

    @GetMapping("/{date}")
    public List<Attendance> getAttendanceByDate(@PathVariable LocalDate date) {
        List<Attendance> attendanceByDate = attendanceService.getAttendanceByDate(date);
        return attendanceByDate;
    }

}
