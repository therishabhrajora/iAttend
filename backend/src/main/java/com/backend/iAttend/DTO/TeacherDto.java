package com.backend.iAttend.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherDto {
    
    private String collegeId;  
    private String teacherId;
    private String name;
    private String email;
    private String password;
    private String subject;
}
