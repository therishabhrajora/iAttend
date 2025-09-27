package com.backend.iAttend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.iAttend.entities.Student;
import com.backend.iAttend.entities.Subscriptions;

@Repository
public interface SubscriptionsRepository extends JpaRepository<Subscriptions, String> {
     List<Student> findByCollegeId(String collegeId);
}
