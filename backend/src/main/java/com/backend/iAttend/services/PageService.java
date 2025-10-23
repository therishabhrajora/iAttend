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
        /*
         * totalStudents: 248,
         * totalTeachers: 24,
         * todayPresent: 186,
         * todayAbsent: 62,
         * attendanceRate: 75.0,
         * weeklyData: [
         * { day: 'Mon', present: 180, absent: 68 },
         * { day: 'Tue', present: 195, absent: 53 },
         * { day: 'Wed', present: 172, absent: 76 },
         * { day: 'Thu', present: 188, absent: 60 },
         * { day: 'Fri', present: 186, absent: 62 },
         * ],
         * subjectWiseAttendance: [
         * { subject: 'Data Structures', attendance: 82 },
         * { subject: 'DBMS', attendance: 78 },
         * { subject: 'OS', attendance: 71 },
         * { subject: 'Networks', attendance: 68 },
         * ]
         */
        long totalStudents = studentRepository.findAll().size();
        long totalTeachers = teacherRepository.findAll().size();

        long presentToday = attendanceRepository.findAll().stream()
                .filter(a -> a.getDate().isEqual(date))
                .filter(a -> a.getStatus().equals("PRESENT"))
                .map(Attendance::getStudent)
                .distinct()
                .collect(Collectors.toList()).size();
        
        long absentToday = totalStudents - presentToday;

        double attendanceRate = (presentToday * 100.0) / totalStudents;

        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("E",
        // Locale.ENGLISH); // Mon, Tue...

        Map<String, Map<String, Long>> weeklyMap = attendanceRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        a -> a.getDate().getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH), // "Mon"
                        Collectors.groupingBy(
                                Attendance::getStatus,
                                Collectors.counting())));

        List<Map<String, Object>> weeklyData = weeklyMap.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("day", entry.getKey());
                    map.put("present", entry.getValue().getOrDefault(true, 0L));
                    map.put("absent", entry.getValue().getOrDefault(false, 0L));
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

        System.out.println(dashboardDto);

        return ResponseEntity.ok().body(dashboardDto);

    }

}
