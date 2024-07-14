package com.example.parkingV_2.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements CommandLineRunner {

    @Autowired
    private PublicAPI publicAPI;
    @Autowired
    private StaticPublicAPI staticPublicAPI;

    @Override
    public void run(String... args) throws Exception {
        publicAPI.fetchAndSaveParkingData("1","1000");
        publicAPI.fetchAndSaveParkingData("1001","2000");
        staticPublicAPI.saveStaticParkingData("1","1000");
        staticPublicAPI.saveStaticParkingData("1001","2000");
    }
}