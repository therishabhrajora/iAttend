package com.backend.iAttend.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.DashboardDto;
import com.backend.iAttend.entities.Attendance;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.repository.AttendanceRepository;
import com.backend.iAttend.repository.CollegeRepository;
import com.backend.iAttend.repository.StudentRepository;
import com.backend.iAttend.repository.TeacherRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PageService {

        private final StudentRepository studentRepository;
        private final CollegeRepository collegeRepository;
        private final TeacherRepository teacherRepository;
        private final AttendanceRepository attendanceRepository;

        public PageService(StudentRepository studentRepository,
                        CollegeRepository collegeRepository,
                        TeacherRepository teacherRepository, AttendanceRepository attendanceRepository) {
                this.studentRepository = studentRepository;
                this.collegeRepository = collegeRepository;
                this.teacherRepository = teacherRepository;
                this.attendanceRepository = attendanceRepository;
        }

        public ResponseEntity<?> dashboardDetails(LocalDate date) {
                
                long totalStudents = studentRepository.findAll().size();
                long totalTeachers = teacherRepository.findAll().size();
                long presentToday = attendanceRepository.findAll().stream()
                                .filter(a -> a.getDate() != null && a.getDate().isEqual(date))
                                .filter(a -> a.getStatus() != null && a.getStatus().equals("Present"))
                                .map(Attendance::getStudent)
                                .distinct()
                                .count();

                long absentToday = totalStudents - presentToday;

                double attendanceRate = (presentToday * 100.0) / totalStudents;

                Map<String, Map<String, Long>> weeklyMap = attendanceRepository.findAll().stream()
                                .collect(Collectors.groupingBy(
                                                a -> a.getDate().getDayOfWeek().getDisplayName(TextStyle.SHORT,
                                                                Locale.ENGLISH), 
                                                Collectors.groupingBy(
                                                                Attendance::getStatus,
                                                                Collectors.counting())));

                List<Map<String, Object>> weeklyData = weeklyMap.entrySet().stream()
                                .map(entry -> {
                                        Map<String, Object> map = new HashMap<>();
                                        map.put("day", entry.getKey());
                                        map.put("present", entry.getValue().getOrDefault("present", 0L));
                                        map.put("absent", entry.getValue().getOrDefault("absent", 0L));

                                        return map;
                                })
                                .collect(Collectors.toList());

                Map<String, List<Attendance>> subjectGroups = attendanceRepository.findAll().stream()
                                .collect(Collectors.groupingBy(Attendance::getSubject));

                List<Map<String, Object>> subjectWiseAttendance = subjectGroups.entrySet().stream()
                                .map(entry -> {
                                        String subject = entry.getKey();
                                        List<Attendance> records = entry.getValue();

                                        long total = records.size();
                                        long presentCount = records.stream()
                                                        .filter(a -> "Present".equalsIgnoreCase(a.getStatus()))
                                                        .count();

                                        double attendancePercentage = (presentCount * 100.0) / total;

                                        Map<String, Object> map = new HashMap<>();
                                        map.put("subject", subject);
                                        map.put("attendance", Math.round(attendancePercentage));
                                        return map;
                                })

                                .collect(Collectors.toList());

                DashboardDto dashboardDto = DashboardDto.builder()
                                .totalStudents(totalStudents)
                                .totalTeachers(totalTeachers)
                                .todayAbsent(absentToday)
                                .todayPresent(presentToday)
                                .attendanceRate(attendanceRate)
                                .weeklydata(weeklyData)
                                .subjectWiseAttendance(subjectWiseAttendance)
                                .build();

              //  System.out.println(dashboardDto);

                return ResponseEntity.ok().body(dashboardDto);

        }

}
