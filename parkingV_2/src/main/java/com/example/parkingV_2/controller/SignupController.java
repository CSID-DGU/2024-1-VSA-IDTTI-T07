package com.example.parkingV_2.controller;


import com.example.parkingV_2.dto.SignupDTO;
import com.example.parkingV_2.entity.UserEntity;
import com.example.parkingV_2.service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")  // React 앱이 실행되는 주소와 포트
@RestController
public class SignupController {

    @Autowired
    private SignupService service;

    @PostMapping("/api/signup")
    public ResponseEntity<UserEntity> create(@RequestBody SignupDTO dto) {
        UserEntity created = service.create(dto);
        return (created!=null) ?
                ResponseEntity.status(HttpStatus.OK).body(null) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/api/signup/email")
    public ResponseEntity<String> emailCheck(@RequestBody String email) {
        boolean check = service.checkByEmail(email);
        return (check) ?
                ResponseEntity.status(HttpStatus.OK).body("가입 가능") :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 중복");
    }

    @GetMapping("/api/signup/nickname")
    public ResponseEntity<String> nicknameCheck(@RequestBody String nickname) {
        boolean check = service.checkByNickname(nickname);
        return (check) ?
                ResponseEntity.status(HttpStatus.OK).body("가입 가능") :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 중복");
    }
}
