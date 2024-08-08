package com.example.parkingV_2.service;

import com.example.parkingV_2.dto.LoginDTO;
import com.example.parkingV_2.entity.UserEntity;
import com.example.parkingV_2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserEntity loginAuth(LoginDTO dto) {
        UserEntity target = userRepository.findById(dto.getEmail()).orElse(null);
        if (target != null && bCryptPasswordEncoder.matches(dto.getPassword(),target.getPassword())) {
            return target;
        }
        return null;
    }
}
