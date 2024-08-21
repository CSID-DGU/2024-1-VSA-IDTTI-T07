package com.example.parkingV_2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecuriryConfig {

    @Bean // 여기에 특정 사이트는 모두 접근, 특정 사이트는 권한 있어야 접근 가능하도록 설정해 줌
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //authorizeHttpRequests() 얘를 통해서 특정 경로의 요청을 허용/거부 할 수 있음, 람다식으로 작성해야함 , 동작은 상단부터 차례대로 이루어짐
        http.authorizeHttpRequests((auth) -> auth // requestMatchers는 root경로에 대해서 특정한 작업을 진행하고 싶다, 특정 경로에 권한을 주는 것
                .requestMatchers("/",
                        "/api/signup",
                        "/api/parking",
                        "/signup",
                        "/api/login",
                        "/api/favorite",
                        "api/favorite-parking",
                        "/api/predict",
                        "/api/distance")
                .permitAll()
                .requestMatchers("/admin").hasRole("ADMIN") // ADMIN이라는 role이 있으면 접근 할 수 있음
                .requestMatchers("/my/**").hasAnyRole("ANDMIN","USER") // my 뒤에 각 유저정보가 들어올 수 있도록 **(와일드카드)를 통해서 설정
                .anyRequest().authenticated() // 위에서 처리하지 못하는 나머지 경로를 처리함
        );
//        http
//                .formLogin((auth) -> auth.loginPage("/login")
//                        .loginProcessingUrl("/loginProc")
//                        .permitAll()
//                ); //
        // csrf(사이트 위변조 방지 설정)이 자동으로 설정 되어있음 , post요청을 보낼때 csrf 토큰도 보내주어야 로그인이 진행됨
        http// 그래서 여기서는 disable해놓고 진행
                .csrf((auth) -> auth.disable());


        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
