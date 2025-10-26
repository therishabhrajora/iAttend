package com.backend.iAttend.config;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ServerPingScheduler {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String healthUrl = "https://iattend-yvjs.onrender.com/api/health";

    @Scheduled(fixedRate = 14 * 60 * 1000) // 14 minutes in milliseconds
    public void pingServer() {
        try {
            String response = restTemplate.getForObject(healthUrl, String.class);
            System.out.println("Pinged server: " + response);
        } catch (Exception e) {
            System.out.println("Ping failed: " + e.getMessage());
        }
    }
}

