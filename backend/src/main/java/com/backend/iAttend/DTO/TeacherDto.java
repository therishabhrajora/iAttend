package com.backend.iAttend.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherDto {
    private String collegeId;  
    private String name;
    private String teacherId;
    private String subject;
    private String email;
    private String password;
}
