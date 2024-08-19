package com.example.parkingV_2.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements CommandLineRunner {
    @Autowired
    private StaticPublicAPI staticPublicAPI;

    @Override
    public void run(String... args) throws Exception {
        staticPublicAPI.saveStaticParkingData("1","1000");
        staticPublicAPI.saveStaticParkingData("1001","2000");
    }
}