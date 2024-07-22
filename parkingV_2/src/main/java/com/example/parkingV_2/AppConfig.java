package com.example.parkingV_2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Value("${parking.api.key}")
    private String apiKey;

    public String getApiKey() {
        return apiKey;
    }
}
