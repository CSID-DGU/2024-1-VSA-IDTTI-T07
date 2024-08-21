package com.example.parkingV_2.repository;

import com.example.parkingV_2.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,String> {
    // username field가 where값으로 존재하는지 쿼리를 실행 후 존재하면 true , 존재안하면 false
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);


}
