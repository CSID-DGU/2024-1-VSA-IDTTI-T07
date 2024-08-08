package com.example.parkingV_2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="user")
public class UserEntity {

    @Id
    @Column(length = 50)
    private String email;
    private String password;
    @Column(unique = true) // 닉네임 중복안되게
    private String nickname;
    private String role;

}
