package com.example.parkingV_2;

import com.example.parkingV_2.entity.ParkingData;
import com.example.parkingV_2.service.ParkingDataService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Component
public class TestCode {
    @Autowired
    private ParkingDataService parkingDataService;

    public static void main(String[] args) throws Exception {

        StringBuilder urlBuilder = new StringBuilder("http://openapi.seoul.go.kr:8088");
        urlBuilder.append("/").append(URLEncoder.encode("524d684852746c7a39386c5a6f6562", "UTF-8")); // 인증키
        urlBuilder.append("/").append(URLEncoder.encode("json", "UTF-8")); // 요청파일타입
        urlBuilder.append("/").append(URLEncoder.encode("GetParkingInfo", "UTF-8")); // 서비스명
        urlBuilder.append("/").append(URLEncoder.encode("1", "UTF-8")); // 요청시작위치
        urlBuilder.append("/").append(URLEncoder.encode("1000", "UTF-8")); // 요청종료위치
        urlBuilder.append("/").append(URLEncoder.encode("", "UTF-8")); // 서비스별 추가 요청인자들

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();

            String jsonResponse = sb.toString();
            JSONObject jObject = new JSONObject(jsonResponse);
            JSONArray jArray = jObject.getJSONObject("GetParkingInfo").getJSONArray("row");

            boolean flag = true;
            int spaceCount=2;


            for (int i = 0; i < jArray.length()-1; i++) {// 0,1<2

                JSONObject obj = jArray.getJSONObject(i);


                String targetAddr = obj.getString("PKLT_CD");
                if (targetAddr.equals("1510496")) {
                    System.out.println(obj.getString("ADDR"));
                }

            }
//            parkingDataService.saveParkingDatas(parkingDataList);

        } else {
            throw new IOException("Failed to fetch data from API, response code: " + conn.getResponseCode());
        }
    }
}
