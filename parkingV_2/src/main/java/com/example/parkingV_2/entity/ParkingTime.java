package com.example.parkingV_2.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ParkingTime {

    private String code; //PKLT_CD
    private int availParkSpace;
    private int totalSpace;
    private int currentParkSpace;
}
