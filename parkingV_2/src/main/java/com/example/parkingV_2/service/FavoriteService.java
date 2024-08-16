package com.example.parkingV_2.service;

import com.example.parkingV_2.dto.FavoriteDTO;
import com.example.parkingV_2.entity.FavoriteEntity;
import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.entity.UserEntity;
import com.example.parkingV_2.repository.FavoriteRepository;
import com.example.parkingV_2.repository.ParkingCodesRepository;
import com.example.parkingV_2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private UserRepository userRepository; // UserRepository 추가
    @Autowired
    private ParkingCodesRepository parkingCodesRepository;


    public FavoriteEntity saveFavoriteData(FavoriteDTO dto) {
        // email로 UserEntity 조회
        UserEntity userEntity = userRepository.findById(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // FavoriteEntity 생성 및 설정
        FavoriteEntity favoriteEntity = new FavoriteEntity();
        favoriteEntity.setCode(dto.getCode());
        favoriteEntity.setFavorite(dto.getFavorite());
        favoriteEntity.setUser(userEntity); // email 대신 user 설정
        if (!dto.getFavorite()) {
            favoriteRepository.deleteByCode(dto.getCode());
            return null;
        }
        // 저장
        return favoriteRepository.save(favoriteEntity);

    }


    public List<FavoriteEntity> findByEmail(String email) {
        UserEntity userEntity = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return favoriteRepository.findAllByUser(userEntity);
    }

    public List<ParkingCodes> findParkingDataByEmail(String email) {
        UserEntity userEntity = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<FavoriteEntity> allByUser = favoriteRepository.findAllByUser(userEntity);

        List<ParkingCodes> parkingCodesList = new ArrayList<>();
        for (FavoriteEntity favoriteEntity : allByUser) {
            ParkingCodes byCode = parkingCodesRepository.findByCode(String.valueOf(favoriteEntity.getCode()));
            parkingCodesList.add(byCode);
        }
        return parkingCodesList;
    }

}
