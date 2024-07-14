//package com.example.parkingV_2.component;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//@Component
//public class ScheduledTasks {
//
//    @Autowired
//    private PublicAPI publicAPI;
//
//    @Scheduled(fixedRate = 60000*5) // 1분마다 실행
//    public void fetchParkingDataPeriodically() throws Exception {
//        publicAPI.fetchAndSaveParkingData();
//    }
//}