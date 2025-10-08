package com.backend.iAttend.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CollegeDto {
    private String name;
    private String address;
    private String contact;
    private String email;
    private String password; 
}
