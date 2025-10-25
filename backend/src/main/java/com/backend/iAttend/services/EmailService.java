package com.backend.iAttend.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final Random random = new Random();

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    private Map<String, String> otpStorage = new HashMap<>();

    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rishabhrajoraniet@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        javaMailSender.send(message);

      

    }

    public String generateOtp() {
        int otp = 100000 + random.nextInt(900000); // 6-digit OTP
        return String.valueOf(otp);
    }

    public void sendOtpToUser(String email) {
        String otp = generateOtp();
        otpStorage.put(email, otp); // store OTP
        String subject = "Your Login Verification OTP";
        String body = "Your OTP for login is: " + otp + "\nThis code is valid for 5 minutes.";

        sendMail(email, subject, body);
    }

    public ResponseEntity<String> verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);

        System.out.println( "Stored OTP: " + storedOtp + ", Provided OTP: " + otp);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email);
            return ResponseEntity.ok("Email verified successfully!");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired OTP!");
        }
    }


}
