package com.backend.iAttend.DTO;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {
    private long totalStudents;
    private long totalTeachers;
    private long todayPresent;
    private long todayAbsent;
    private double attendanceRate;
    List<Map<String, Object>> weeklydata;
    List<Map<String, Object>> subjectWiseAttendance;

}
