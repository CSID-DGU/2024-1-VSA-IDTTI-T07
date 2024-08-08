package com.example.parkingV_2.signup;

import com.example.parkingV_2.dto.SignupDTO;
import com.example.parkingV_2.entity.UserEntity;
import com.example.parkingV_2.service.SignupService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class SignupTest {

    @Autowired
    private SignupService service;

    @Transactional
    @Test
    @DisplayName("회원가입 테스트")
    public void signupTest() {
        SignupDTO dto = new SignupDTO("tlzhsh2@naver.com", "paxp", "lee","USER");
        UserEntity userEntity = service.create(dto);
        UserEntity target = service.getUser(userEntity.getEmail());
        Assertions.assertThat(userEntity).isEqualTo(target);
//        Assertions.assertThat(target).isEqualTo(userEntity);
    }
}
