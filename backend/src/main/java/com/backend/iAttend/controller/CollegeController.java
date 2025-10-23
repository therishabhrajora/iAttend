package com.backend.iAttend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.DTO.CollegeDto;
import com.backend.iAttend.entities.College;
import com.backend.iAttend.services.CollegeService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/college")
public class CollegeController {

    private final CollegeService collegeService;

    public CollegeController(CollegeService collegeService) {
        this.collegeService = collegeService;
    }

   

    @GetMapping("/all")
    public ResponseEntity<List<College>> getMethodName() {
        List<College> colleges=collegeService.getAllCollege();

        return ResponseEntity.ok(colleges);
    }


    

}
