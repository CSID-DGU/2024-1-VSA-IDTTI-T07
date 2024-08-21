package com.example.parkingV_2.component;

import com.example.parkingV_2.entity.ParkingData;

import java.util.List;

public interface PublicAPI {
    void fetchAndSaveParkingData(String startDataNum, String endDataNum) throws Exception;
}
