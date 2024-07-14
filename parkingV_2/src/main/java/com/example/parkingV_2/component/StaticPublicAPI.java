package com.example.parkingV_2.component;

import com.example.parkingV_2.entity.ParkingCodes;
import com.example.parkingV_2.entity.ParkingData;
import com.example.parkingV_2.repository.ParkingDataRepository;
import com.example.parkingV_2.service.ParkingCodesService;
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
public class StaticPublicAPI {
    @Autowired
    private ParkingCodesService parkingCodesService;

    public void saveStaticParkingData(String startDataNum,String endDataNum) throws Exception {
        StringBuilder urlBuilder = new StringBuilder("http://openapi.seoul.go.kr:8088");
        urlBuilder.append("/").append(URLEncoder.encode("524d684852746c7a39386c5a6f6562", "UTF-8")); // 인증키
        urlBuilder.append("/").append(URLEncoder.encode("json", "UTF-8")); // 요청파일타입
        urlBuilder.append("/").append(URLEncoder.encode("GetParkingInfo", "UTF-8")); // 서비스명
        urlBuilder.append("/").append(URLEncoder.encode(startDataNum, "UTF-8")); // 요청시작위치
        urlBuilder.append("/").append(URLEncoder.encode(endDataNum, "UTF-8")); // 요청종료위치
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


            List<ParkingCodes> parkingCodesList = new ArrayList<>();
            ParkingCodes parkingCodeEntity=null;

            for (int i = 0; i < jArray.length(); i++) {
                JSONObject obj = jArray.getJSONObject(i);

                String parkingCode = obj.getString("PKLT_CD");
                parkingCodeEntity = parkingCodesService.findByCode(parkingCode);
                if (parkingCodeEntity == null) {
                    parkingCodeEntity = new ParkingCodes();
                    parkingCodeEntity.setCode(parkingCode);
                    parkingCodeEntity.setParkingName(obj.getString("PKLT_NM")); // 주차장명
                    parkingCodeEntity.setAddress(obj.getString("ADDR")); // 주소
                    parkingCodeEntity.setParkingType(obj.getString("PRK_TYPE_NM")); // 주차장 종류명
                    parkingCodeEntity.setOperationType(obj.getString("OPER_SE")); // 운영구분명
                    parkingCodeEntity.setPhoneNumber(obj.getString("TELNO")); // 전화번호
                    parkingCodeEntity.setFreeOrNot(obj.getString("PAY_YN_NM")); // 유무료구분명
                    parkingCodeEntity.setNightFreeOpenName(obj.getString("NGHT_PAY_YN_NM")); // 야간무료개방여부명
                    parkingCodeEntity.setWeekdayOpenTime(obj.getString("WD_OPER_BGNG_TM")); // 평일 운영 시작시각
                    parkingCodeEntity.setWeekdayCloseTime(obj.getString("WD_OPER_END_TM")); // 평일 운영 종료시각
                    parkingCodeEntity.setWeekendOpenTime(obj.getString("WE_OPER_BGNG_TM")); // 주말 운영 시작시각
                    parkingCodeEntity.setWeekendCloseTime(obj.getString("WE_OPER_END_TM")); // 주말 운영 종료시각
                    parkingCodeEntity.setHolidayOpenTime(obj.getString("LHLDY_OPER_BGNG_TM")); // 공휴일 운영 시작시각
                    parkingCodeEntity.setHolidayCloseTime(obj.getString("LHLDY_OPER_END_TM")); // 공휴일 운영 종료시각
                    parkingCodeEntity.setSaturdayFreeOrNot(obj.getString("SAT_CHGD_FREE_NM")); // 토요일 유,무료 구분명
                    parkingCodeEntity.setHolidayFreeOrNot(obj.getString("LHLDY_CHGD_FREE_SE_NAME")); // 공휴일 유,무료 구분명
                    parkingCodeEntity.setMonthlyTicketAmount(obj.getString("PRD_AMT")); // 월 정기권 금액
                    parkingCodeEntity.setBaseParkingFee(obj.getInt("BSC_PRK_CRG")); // 기본 주차 요금
                    parkingCodeEntity.setBaseParkingTime(obj.getInt("BSC_PRK_HR")); // 기본 주차 시간
                    parkingCodeEntity.setAdditionalFee(obj.getInt("ADD_PRK_CRG")); // 추가 단위 요금
                    parkingCodeEntity.setAdditionalTime(obj.getInt("ADD_PRK_HR")); // 추가 단위 시간
                    parkingCodeEntity.setMaxDailyFee(obj.getInt("DAY_MAX_CRG")); // 일 최대 요금
                    parkingCodeEntity.setLatitude(obj.getDouble("LAT")); // 주차장 위치 좌표 위도
                    parkingCodeEntity.setLongitude(obj.getDouble("LOT")); // 주차장 위치 좌표 경도

                    parkingCodesList.add(parkingCodeEntity);

                }

            }

            parkingCodesService.saveParkingCodes(parkingCodesList);

        } else {
            throw new IOException("Failed to fetch data from API, response code: " + conn.getResponseCode());
        }
    }
}
