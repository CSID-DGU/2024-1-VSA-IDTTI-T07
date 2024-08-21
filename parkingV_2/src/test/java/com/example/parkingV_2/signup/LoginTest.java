package com.example.parkingV_2.signup;

import com.example.parkingV_2.dto.LoginDTO;
import com.example.parkingV_2.entity.UserEntity;
import com.example.parkingV_2.repository.UserRepository;
import com.example.parkingV_2.service.LoginService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class LoginTest {

    @Autowired
    private LoginService loginService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @BeforeEach
    public void setUp() {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("tlzhsh10@naver.com");
        userEntity.setPassword(bCryptPasswordEncoder.encode("paxp"));
        userEntity.setNickname("lee");
        userEntity.setRole("USER");
    }

    @Test
    @DisplayName("로그인 테스트")
    public void loginTest() {
        LoginDTO loginDTO = new LoginDTO("tlzhsh10@naver.com","paxp");
        UserEntity userEntity = loginService.loginAuth(loginDTO);
        UserEntity target = userRepository.findById(loginDTO.getEmail()).orElse(null);

        Assertions.assertThat(target).isEqualTo(userEntity);


    }
}
