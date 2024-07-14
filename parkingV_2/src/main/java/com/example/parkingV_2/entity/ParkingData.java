package com.example.parkingV_2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity
@Table(name = "ParkingData")
public class ParkingData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String parkingCode;
    @Column
    private String date;
    @Column
    private int availParkSpace;
    @Column // 주소 ADDR
    private String address;

}
