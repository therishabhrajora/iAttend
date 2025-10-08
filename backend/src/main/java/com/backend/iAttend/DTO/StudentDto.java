package com.backend.iAttend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDto {
    private String collegeId;
    private String name;
    private String rollNumber;
    private String studentClass;
    private String email;
    private String password;
}
