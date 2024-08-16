package com.example.parkingV_2.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private PublicAPI publicAPI;

    @Autowired
    private StartupRunner startupRunner;

    @Scheduled(fixedRate = 300000) // 5분 = 300,000 밀리초
    public void fetchAndSaveParkingDataPeriodically() {
        try {
            startupRunner.run();
            publicAPI.fetchAndSaveParkingData("1", "498");
            publicAPI.fetchAndSaveParkingData("499", "504");
            publicAPI.fetchAndSaveParkingData("505", "614");
            publicAPI.fetchAndSaveParkingData("615", "626");
            publicAPI.fetchAndSaveParkingData("627", "763");
            publicAPI.fetchAndSaveParkingData("764", "800");
            publicAPI.fetchAndSaveParkingData("801", "942");
            publicAPI.fetchAndSaveParkingData("943", "962");
            publicAPI.fetchAndSaveParkingData("963", "969");
            publicAPI.fetchAndSaveParkingData("970", "975");
            publicAPI.fetchAndSaveParkingData("976", "1011");
            publicAPI.fetchAndSaveParkingData("1012", "1348");
            publicAPI.fetchAndSaveParkingData("1349", "1589");
            publicAPI.fetchAndSaveParkingData("1590", "1899");
            publicAPI.fetchAndSaveParkingData("1900", "2000");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}