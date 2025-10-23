package com.backend.iAttend.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.iAttend.entities.Attendance;
import com.backend.iAttend.entities.Student;
import com.backend.iAttend.services.PageService;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("")
public class PageContoller {

    private final PageService pageService;

    

    public PageContoller(PageService pageService) {
        this.pageService = pageService;
    }

    @RequestMapping("/logout") 
    public ResponseEntity<String> logout() { 
        return ResponseEntity.ok().body("Logout succssdfully") ;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(@RequestParam Long date){
         LocalDate localDate = Instant.ofEpochMilli(date)
                                 .atZone(ZoneId.systemDefault())
                                 .toLocalDate();
        ResponseEntity<?> dashboardDetails = pageService.dashboardDetails(localDate);
        return dashboardDetails;
    }
    

}
