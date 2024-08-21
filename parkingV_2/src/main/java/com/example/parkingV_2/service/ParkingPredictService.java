package com.example.parkingV_2.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ParkingPredictService {

    private final RestTemplate restTemplate;

    public ParkingPredictService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getParkingPrediction(int hour, int minute, String weekday) {
        String flaskApiUrl = "http://127.0.0.1:5000/predict";
//        String flaskApiUrl = "http://52.78.6.203:5000/predict";

        String url = flaskApiUrl + "?parking_code=" + "&hour=" + hour + "&minute=" + minute + "&weekday=" + weekday;

        return restTemplate.getForObject(url, String.class);
    }
}
