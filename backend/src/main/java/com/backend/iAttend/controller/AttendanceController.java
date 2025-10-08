package com.backend.iAttend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.DTO.AttendanceDTO;
import com.backend.iAttend.entities.Attendance;
import com.backend.iAttend.services.AttendanceService;



@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController( AttendanceService attandanceService) {
        this.attendanceService = attandanceService;
    }

    @PostMapping("/mark")
    public String markAttendance(@RequestBody AttendanceDTO attendanceDTO){
            System.out.println("Received DTO: " + attendanceDTO);
        attendanceService.markAttendance(attendanceDTO);

        return "Attendance marked successfully.";
    }

    @GetMapping("/view/{subject}")
    public List<Attendance> viewAttendance(@PathVariable String subject) {
        System.out.println("Subject: " + subject);
        List<Attendance> viewAttendance = attendanceService.viewAttendance(subject);

        return viewAttendance;
    }
}
