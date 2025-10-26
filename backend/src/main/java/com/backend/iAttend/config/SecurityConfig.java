package com.backend.iAttend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.backend.iAttend.services.CustomUserDetailService;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@Configuration
@EnableAutoConfiguration
public class SecurityConfig {

        private JwtRequestFilter jwtRequestFilter;
        private CustomUserDetailService userDetailService;

        public SecurityConfig(JwtRequestFilter jwtRequestFilter, CustomUserDetailService userDetailService) {
        
                this.jwtRequestFilter = jwtRequestFilter;
                this.userDetailService = userDetailService;
        }
      

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .formLogin(formlogin -> formlogin.disable())
                                .httpBasic(httpbasic -> httpbasic.disable())
                                .authorizeHttpRequests(auth -> auth
                                                // .requestMatchers("/**").permitAll()
                                                .requestMatchers("/api/auth/student/register").permitAll()
                                                .requestMatchers("/api/auth/student/login").permitAll()
                                                .requestMatchers("/api/auth/teacher/register").permitAll()
                                                .requestMatchers("/api/auth/teacher/login").permitAll()
                                                .requestMatchers("/api/auth/verify-otp").permitAll()
                                                .requestMatchers("/api/auth/college/**").permitAll()
                                            
                                                .requestMatchers("/college/**").permitAll()
                                                .requestMatchers("/logout").permitAll()
                                                .requestMatchers(
                                                                "/v3/api-docs/**",
                                                                "/swagger-ui/**",
                                                                "/swagger-ui.html")
                                                .permitAll()
                                                .requestMatchers("/dashboard").authenticated()
                                                .requestMatchers("/student/all").authenticated()
                                                .requestMatchers("/teacher/all").authenticated()
                                                .requestMatchers("/college/all").authenticated()
                                                .requestMatchers("/attendance/**").authenticated()
                                              
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // <-- Rule 1
                                                .invalidSessionUrl("/login?invalidSession=true") // <-- Rule 2
                                )

                                .authenticationProvider(authenticationProvider())
                                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)

                                .cors(cors -> cors.configurationSource(request -> {
                                        CorsConfiguration config = new CorsConfiguration();
                                        config.setAllowCredentials(true);
                                        config.setAllowedOrigins(List.of(
                                                        "https://iattendapp.netlify.app",
                                                        "http://localhost:5173"));
                                        config.addAllowedHeader("*");
                                        config.addAllowedMethod("*");

                                        return config;
                                }))
                                .exceptionHandling(ex -> ex
                                                .authenticationEntryPoint((req, res, excep) -> res
                                                                .sendError(HttpServletResponse.SC_UNAUTHORIZED))
                                                .accessDeniedHandler((req, res, excep) -> res
                                                                .sendError(HttpServletResponse.SC_FORBIDDEN)))
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl("//api/auth/college/login?logout=true")
                                                .invalidateHttpSession(true)
                                                .deleteCookies("JSESSIONID")
                                                .permitAll());

                return http.build();
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
                authenticationProvider.setUserDetailsService(userDetailService);
                authenticationProvider.setPasswordEncoder(passwordEncoder());
                return authenticationProvider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
                        throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
