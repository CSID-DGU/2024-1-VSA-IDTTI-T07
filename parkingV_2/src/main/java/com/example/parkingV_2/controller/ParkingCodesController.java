package com.example.parkingV_2.controller;

import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.service.ParkingCodesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ParkingCodesController {
    @Autowired ParkingCodesService parkingCodesService;

    @GetMapping("/api/parking-codes")
    public List<ParkingCodes> getAllParkingCodeList() {
        return parkingCodesService.findAllParkingCode();
    }
}
