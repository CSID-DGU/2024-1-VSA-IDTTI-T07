package com.example.parkingV_2.service;


import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.entity.ParkingData;
import com.example.parkingV_2.repository.ParkingDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ParkingDataService {

    @Autowired
    private ParkingDataRepository parkingDataRepository;

    public void saveParkingDatas(List<ParkingData> parkingData){
        parkingDataRepository.saveAll(parkingData);
    }

}
