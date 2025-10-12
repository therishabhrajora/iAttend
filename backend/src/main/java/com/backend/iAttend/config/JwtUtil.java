package com.backend.iAttend.config;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
      String JWT_SECRET="this-is-secret-key-this-is-secret-key-this-is-secret-key"; 
    Key key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes()); 
       String project="iAttend";
         public String generateToken(UserDetails userDetails) { 
    return Jwts.builder() 
            .claim("role", userDetails.getAuthorities().iterator().next().getAuthority()) 
            .setSubject(userDetails.getUsername()) 
            .setIssuer(project) 
            .setIssuedAt(new Date()) 
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) 
            .signWith(key) 
            .compact(); 
} 
 
    public String extractUsername(String token){ 
        return Jwts.parser().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject(); 
    } 
 
    public boolean validateToken(String token,UserDetails userDetails){ 
        String username = extractUsername(token); 
        return (username.equals(userDetails.getUsername())); 
    } 
}
