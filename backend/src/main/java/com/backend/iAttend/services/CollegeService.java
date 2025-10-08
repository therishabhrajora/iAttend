package com.backend.iAttend.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.iAttend.DTO.CollegeDto;
import com.backend.iAttend.entities.College;
import com.backend.iAttend.entities.Subscriptions;
import com.backend.iAttend.repository.CollegeRepository;
import com.backend.iAttend.repository.SubscriptionsRepository;

@Service
public class CollegeService {
    private final CollegeRepository collegeRepository;
    private final SubscriptionsRepository subscriptionsRepository;

    CollegeService(CollegeRepository collegeRepository, SubscriptionsRepository subscriptionsRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.collegeRepository = collegeRepository;
    }

    public CollegeDto addCollege(CollegeDto collegedto) {
        String id = "CLG"+UUID.randomUUID().toString();
        College college = College.builder()
                .id(id)
                .name(collegedto.getName())
                .address(collegedto.getAddress())
                .contact(collegedto.getContact())
                .email(collegedto.getEmail())
                .password(collegedto.getPassword())
                .build();
        collegeRepository.save(college);

        Subscriptions subscription = Subscriptions.builder()
                .id(UUID.randomUUID().toString())
                .college(college)
                .isActive(true)
                .build();

        subscriptionsRepository.save(subscription);

        return CollegeDto.builder()
                .name(college.getName())
                .address(college.getAddress())
                .contact(college.getContact())
                .email(college.getEmail())
                .build();
    }

    public List<CollegeDto> getAllCollege() {
        List<CollegeDto> colleges= collegeRepository.findAll().stream()
            .map(college -> CollegeDto.builder()
                .name(college.getName())
                .address(college.getAddress())
                .contact(college.getContact())
                .email(college.getEmail())
                .password("*****")
                .build())
            .collect(Collectors.toList());

            return colleges;
    }

}
