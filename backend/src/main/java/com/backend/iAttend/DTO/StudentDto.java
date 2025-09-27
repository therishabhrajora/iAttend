package com.backend.iAttend.DTO;

import com.backend.iAttend.entities.College;

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
}
