package com.example.parkingV_2.controller;

import com.example.parkingV_2.dto.FavoriteDTO;
import com.example.parkingV_2.entity.FavoriteEntity;
import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.service.FavoriteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@Slf4j
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/api/favorite")
    public ResponseEntity<FavoriteEntity> FavoriteDataSave(@RequestBody FavoriteDTO dto) {
        FavoriteEntity favoriteEntity = favoriteService.saveFavoriteData(dto);
        return (favoriteEntity != null) ?
                ResponseEntity.status(HttpStatus.OK).body(favoriteEntity) : // 수정: 반환 값 수정
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/api/favorite")
    public ResponseEntity<List<FavoriteEntity>> getFavoriteData(@RequestParam String email) {
        log.info("/api/favorite 요청");
        List<FavoriteEntity> favorites = favoriteService.findByEmail(email);
        return ResponseEntity.ok(favorites);
    }
    @GetMapping("/api/favorite-parking")
    public ResponseEntity<List<ParkingCodes>> getFavoriteParkingData(@RequestParam String email) {
        log.info("/api/favorite-parking 요청");
        List<ParkingCodes> parkingCodesList = favoriteService.findParkingDataByEmail(email);
        return ResponseEntity.ok(parkingCodesList);
    }
}
