package com.backend.iAttend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="subscriptions") 
public class Subscriptions {
    @Id
    private String id;
    @OneToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;
    private boolean isActive;
}
