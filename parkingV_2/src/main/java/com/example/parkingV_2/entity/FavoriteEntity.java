package com.example.parkingV_2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FavoriteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true) // 닉네임 중복안되게
    private Long code;
    @ManyToOne
    @JoinColumn(name = "user_email")//외래키 생성
    private UserEntity user;
    private Boolean favorite;

}
