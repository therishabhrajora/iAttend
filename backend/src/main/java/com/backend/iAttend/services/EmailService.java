package com.backend.iAttend.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final Random random = new Random();

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Value("${spring.sendgrid.api-key}")
    private String sendGridApiKey;

    Logger logger = LoggerFactory.getLogger(EmailService.class);

    private Map<String, String> otpStorage = new HashMap<>();

    public void sendMail(String to, String subject, String body) {
        Email from = new Email("rishabhrajoraniet@gmail.com");
        Email recipient = new Email(to);
        Content content = new Content("text/plain", body);
        Mail mail = new Mail(from, subject, recipient, content);

        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
            System.out.println("✅ OTP sent to " + to);
        } catch (IOException ex) {
            System.err.println("❌ Error sending email: " + ex.getMessage());
        }
    }

    public String generateOtp() {
        int otp = 100000 + random.nextInt(900000); // 6-digit OTP
        return String.valueOf(otp);
    }

    public void sendOtpToUser(String email) {

        try {
            String otp = generateOtp();
            otpStorage.put(email, otp);
            logger.info("Generated OTP for {}: {}", email, otp);
            String subject = "Your Login Verification OTP";
            String body = "Your OTP for login is: " + otp + "\nThis code is valid for 5 minutes.";

            sendMail(email, subject, body);
            logger.info("OTP sent to email: {}", email);
        } catch (Exception e) {
            logger.error("Failed to send OTP to {}: {}", email, e.getMessage(), e);
        }

    }

    public ResponseEntity<String> verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);

        System.out.println("Stored OTP: " + storedOtp + ", Provided OTP: " + otp);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email);
            return ResponseEntity.ok("Email verified successfully!");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired OTP!");
        }
    }

}
