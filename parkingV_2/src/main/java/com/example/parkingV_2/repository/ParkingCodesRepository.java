package com.example.parkingV_2.repository;


import com.example.parkingV_2.entity.FavoriteEntity;
import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ParkingCodesRepository extends JpaRepository<ParkingCodes, String> {
    @Modifying
    @Transactional
    @Query("UPDATE ParkingCodes p SET p.availParkSpace = :availParkSpace, p.totalSpace = :totalSpace WHERE p.code = :code")
    void updateParkingSpaces(String code, int availParkSpace, int totalSpace);

    ParkingCodes findByCode(String code);

}
