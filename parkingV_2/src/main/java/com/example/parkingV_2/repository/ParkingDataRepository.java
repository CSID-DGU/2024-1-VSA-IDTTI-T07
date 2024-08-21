package com.example.parkingV_2.repository;


import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.entity.ParkingData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParkingDataRepository extends JpaRepository<ParkingData, Long> {







}
