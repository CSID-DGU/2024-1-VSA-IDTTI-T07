package com.example.parkingV_2.repository;

import com.example.parkingV_2.entity.FavoriteEntity;
import com.example.parkingV_2.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Long> {

    List<FavoriteEntity> findAllByUser(UserEntity user);

    void deleteByCode(Long code);
}
