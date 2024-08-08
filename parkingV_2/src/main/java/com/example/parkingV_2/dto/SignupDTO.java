package com.example.parkingV_2.dto;

import com.example.parkingV_2.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SignupDTO {


    private String email;
    private String password;
    private String nickname;
    private String role;

}
