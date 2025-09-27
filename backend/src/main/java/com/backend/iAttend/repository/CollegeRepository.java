package com.backend.iAttend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.iAttend.entities.College;

@Repository
public interface CollegeRepository extends JpaRepository<College, String> {
    // custom query methods if needed
    boolean existsByEmail(String email);
    College findByEmail(String email);
}
