package com.backend.iAttend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDto {
        private String id;
        private CollegeDto college; // College details
        private boolean isActive; // Subscription status
}
