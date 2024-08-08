package com.example.parkingV_2.controller;

import com.example.parkingV_2.dto.LoginDTO;
import com.example.parkingV_2.dto.LoginResponseDTO;
import com.example.parkingV_2.dto.SignupDTO;
import com.example.parkingV_2.entity.UserEntity;
import com.example.parkingV_2.repository.UserRepository;
import com.example.parkingV_2.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/api/login")
    public ResponseEntity<LoginResponseDTO> loginPage(@RequestBody LoginDTO dto) {
        UserEntity userEntity = loginService.loginAuth(dto);
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setEmail(userEntity.getEmail());
        loginResponseDTO.setNickname(userEntity.getNickname());
        return (userEntity!=null) ?
                ResponseEntity.status(HttpStatus.OK).body(loginResponseDTO) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


}
