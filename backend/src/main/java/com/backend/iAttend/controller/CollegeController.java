package com.backend.iAttend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.DTO.CollegeDto;

import com.backend.iAttend.services.CollegeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/college")
public class CollegeController {

    private final CollegeService collegeService;

    public CollegeController(CollegeService collegeService) {
        this.collegeService = collegeService;
    }

    @PostMapping("/addCollege")
    public ResponseEntity<CollegeDto> postMethodName(@RequestBody CollegeDto collegedto) {
       CollegeDto college=collegeService.addCollege(collegedto);

       return ResponseEntity.ok(college);
       
    }
    

}
