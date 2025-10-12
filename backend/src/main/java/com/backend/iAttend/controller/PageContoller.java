package com.backend.iAttend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class PageContoller {

    @RequestMapping("/logout") 
    public ResponseEntity<String> logout() { 
        return ResponseEntity.ok().body("Logout succssdfully") ;
    }

}
