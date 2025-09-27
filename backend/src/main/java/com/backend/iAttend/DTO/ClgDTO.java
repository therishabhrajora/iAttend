package com.backend.iAttend.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClgDTO {
    private String id;
    private String name;
    private String address;
    private String contact;
    private String email;
    // password usually not exposed in DTO → excluded for safety
}
