package com.example.parkingV_2.service;


import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.repository.ParkingCodesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingCodesService {
    @Autowired
    private ParkingCodesRepository parkingCodesRepository;

    public void saveParkingCodes(List<ParkingCodes> parkingCodesList) {
        parkingCodesRepository.saveAll(parkingCodesList);
    }

    public ParkingCodes findByCode(String code) {
        Optional<ParkingCodes> parkingCode = parkingCodesRepository.findById(code);
        return parkingCode.orElse(null);
    }

    public List<ParkingCodes> findAllParkingCode() {
        return parkingCodesRepository.findAll();
    }

    public void updateParkingSpaces(String code, int availParkSpace, int totalSpace) {
        parkingCodesRepository.updateParkingSpaces(code, availParkSpace, totalSpace);
    }

}
