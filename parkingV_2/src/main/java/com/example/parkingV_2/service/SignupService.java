package com.example.parkingV_2.service;

import com.example.parkingV_2.dto.SignupDTO;
import com.example.parkingV_2.entity.UserEntity;
import com.example.parkingV_2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    // 회원가입 메소드
    public UserEntity create(SignupDTO dto) {
        //DB에 같은 닉네임이나 이메일이 존재할 경우 null값을 보내서 오류 발생시킴
        boolean isNickname = userRepository.existsByNickname(dto.getNickname());
        boolean isEmail = userRepository.existsByEmail(dto.getEmail());
        if (isNickname || isEmail) {
            return null;
        }
        UserEntity user = new UserEntity();
        user.setEmail(dto.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        user.setNickname(dto.getNickname());
        user.setRole("USER");
        return userRepository.save(user);
    }

    // 이메일 중복 확인
    public boolean checkByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    // 닉네임 중복 확인
    public boolean checkByNickname(String nickname) {
        return userRepository.existsByEmail(nickname);
    }
    
    public UserEntity getUser(String email) {
        return userRepository.findById(email).orElse(null);
    }
    
    

}
