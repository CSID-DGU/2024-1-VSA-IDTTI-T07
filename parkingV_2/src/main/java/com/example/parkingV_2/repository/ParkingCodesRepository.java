package com.example.parkingV_2.repository;


import com.example.parkingV_2.entity.ParkingCodes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingCodesRepository extends JpaRepository<ParkingCodes, String> {
}
