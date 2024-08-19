package com.example.parkingV_2.controller;

import com.example.parkingV_2.dto.DistanceDTO;
import com.example.parkingV_2.entity.FavoriteEntity;
import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.repository.ParkingCodesRepository;
import com.example.parkingV_2.service.ParkingCodesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class DistanceController {

    @Autowired
    private ParkingCodesService parkingCodesService;

    @PostMapping("/api/distance")
    public ResponseEntity<List<ParkingCodes>> getDistanceData(@RequestBody DistanceDTO dto) {
        log.info("/api/distance 요청 : " );
        List<ParkingCodes> distanceList = parkingCodesService.findByCodeList(dto);
        return ResponseEntity.ok(distanceList);
    }
}
