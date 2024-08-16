package com.example.parkingV_2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class ParkingV2Application {

	public static void main(String[] args) {
		SpringApplication.run(ParkingV2Application.class, args);
	}

}
