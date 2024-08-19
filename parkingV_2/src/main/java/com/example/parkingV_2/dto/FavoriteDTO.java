package com.example.parkingV_2.dto;

import com.example.parkingV_2.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteDTO {
    private Long code;
    private String email;
    private Boolean favorite;
}
