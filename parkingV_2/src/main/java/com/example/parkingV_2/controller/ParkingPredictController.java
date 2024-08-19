package com.example.parkingV_2.controller;

import com.example.parkingV_2.service.ParkingPredictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ParkingPredictController {

    private final ParkingPredictService ParkingPredictService;

    @Autowired
    public ParkingPredictController(ParkingPredictService ParkingPredictService) {
        this.ParkingPredictService = ParkingPredictService;
    }

    @GetMapping("/api/predict")
    public ResponseEntity<String> predictParking(@RequestParam int hour,
                                                 @RequestParam int minute,
                                                 @RequestParam String weekday) {

        String prediction = ParkingPredictService.getParkingPrediction(hour, minute, weekday);
        return ResponseEntity.ok(prediction);
    }
}
