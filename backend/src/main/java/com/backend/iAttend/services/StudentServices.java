package com.backend.iAttend.services;

import java.util.UUID;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.StudentDto;
import com.backend.iAttend.entities.College;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.enums.Role;
import com.backend.iAttend.repository.AttendanceRepository;
import com.backend.iAttend.repository.CollegeRepository;
import com.backend.iAttend.repository.StudentRepository;

@Service
public class StudentServices {

        private final StudentRepository studentRepository;
        private final CollegeRepository collegeRepository;
        private final AttendanceRepository attendanceRepository;
        private final PasswordEncoder passwordEncoder;

        StudentServices(StudentRepository studentRepository, CollegeRepository collegeRepository,
                        PasswordEncoder passwordEncoder, AttendanceRepository attendanceRepository) {
                this.studentRepository = studentRepository;
                this.collegeRepository = collegeRepository;
                this.attendanceRepository = attendanceRepository;
                this.passwordEncoder = passwordEncoder;
        }

        public StudentDto saveStudent(StudentDto studentDto) {
                String id = "STU" + UUID.randomUUID().toString();
                String idAtt = "ATT" + UUID.randomUUID().toString();

                College college = collegeRepository.findById(studentDto.getCollegeId())
                                .orElseThrow(() -> new RuntimeException("College not found"));
                Student student = new Student();
                student.setId(id);
                student.setCollege(college);
                student.setName(studentDto.getName());
                student.setRollNumber(studentDto.getRollNumber());
                student.setStudentClass(studentDto.getStudentClass());
                student.setEmail(studentDto.getEmail());
                student.setPassword(passwordEncoder.encode(studentDto.getPassword()));
                student.setRole(Role.STUDENT.name());

                studentRepository.save(student);

                return StudentDto.builder()
                                .collegeId(student.getCollege().getId())
                                .name(student.getName())
                                .rollNumber(student.getRollNumber())
                                .studentClass(student.getStudentClass())
                                .email(student.getEmail())
                                .password("****")
                                .build();
        }

        public List<Student> getAllStudents() {
                List<Student> students = studentRepository.findAll()
                                .stream()
                                .sorted(Comparator.comparing(Student::getRollNumber))
                                .collect(Collectors.toList());

                return students;
        }

}
