package com.example.parkingV_2.component;

import com.example.parkingV_2.AppConfig;
import com.example.parkingV_2.entity.ParkingData;
import com.example.parkingV_2.service.ParkingDataService;
import lombok.extern.slf4j.Slf4j;
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
import java.util.*;

@Slf4j
@Component
public class PublicAPIDataCollector implements PublicAPI {
    @Autowired
    private ParkingDataService parkingDataService;
    @Autowired
    private AppConfig appConfig;
    public void fetchAndSaveParkingData(String startDataNum,String endDataNum) throws Exception {

        String apiKey = appConfig.getApiKey();

        StringBuilder urlBuilder = new StringBuilder("http://openapi.seoul.go.kr:8088");
        urlBuilder.append("/").append(URLEncoder.encode(apiKey, "UTF-8")); // 인증키
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

            boolean flag = true;
            int spaceCount=1;

            List<ParkingData> parkingDataList = new ArrayList<>();
            log.info("Len : {} ",jArray.length());
            for (int i = 0; i < jArray.length()-1; i++) {// 0,1<2

                JSONObject obj = jArray.getJSONObject(i);
                JSONObject obj2 = jArray.getJSONObject(i + 1);

                String targetCode = obj.getString("PKLT_CD");
                String targetAddr = obj.getString("ADDR");
                boolean found = parkingDataList.stream().anyMatch(addr -> addr.getAddress().equals(targetAddr));
                if (!obj.getString("PRK_STTS_NM").equals("미연계중")) {
                    if (!found) {
                        ParkingData parkingData = new ParkingData();
                        if (!obj.getString("PKLT_CD").equals(obj2.getString("PKLT_CD"))) {

                            if (!flag) {
                                parkingData.setTotalSpace(spaceCount);
                                parkingData.setCurrentParkSpace(obj.getInt("NOW_PRK_VHCL_CNT"));
                                if (spaceCount - obj.getInt("NOW_PRK_VHCL_CNT") < 0) {
                                    parkingData.setAvailParkSpace(0);
                                } else {
                                    parkingData.setAvailParkSpace(spaceCount - obj.getInt("NOW_PRK_VHCL_CNT"));
                                }
                                flag = true;
                                spaceCount = 1;
                            } else {
                                if (obj.getInt("TPKCT") - obj.getInt("NOW_PRK_VHCL_CNT") < 0) {
                                    parkingData.setAvailParkSpace(0);
                                } else {
                                    parkingData.setAvailParkSpace(obj.getInt("TPKCT") - obj.getInt("NOW_PRK_VHCL_CNT"));
                                }
                                parkingData.setCurrentParkSpace(obj.getInt("NOW_PRK_VHCL_CNT"));
                            }


                            parkingData.setDate(obj.getString("NOW_PRK_VHCL_UPDT_TM"));
//                    parkingData.setCrrSpaces(obj.getInt("NOW_PRK_VHCL_CNT"));
                            parkingData.setAddress(obj.getString("ADDR"));
                            parkingData.setParkingCode(obj.getString("PKLT_CD"));
                            parkingDataList.add(parkingData);
                            if ((i + 2) == jArray.length()) { //i=0, length =3 i+2=2 // i=1 , i+2=3,len=3//i=2 , i+1=3,len=3
                                ParkingData LastParkingData = new ParkingData();
                                parkingData.setCurrentParkSpace(obj.getInt("NOW_PRK_VHCL_CNT"));
                                if (obj.getInt("TPKCT") - obj.getInt("NOW_PRK_VHCL_CNT") < 0) {
                                    parkingData.setAvailParkSpace(0);
                                } else {
                                    parkingData.setAvailParkSpace(obj.getInt("TPKCT") - obj.getInt("NOW_PRK_VHCL_CNT"));
                                }
                                LastParkingData.setDate(obj2.getString("NOW_PRK_VHCL_UPDT_TM"));
//                    parkingData.setCrrSpaces(obj.getInt("NOW_PRK_VHCL_CNT"));
                                LastParkingData.setAddress(obj2.getString("ADDR"));
                                LastParkingData.setParkingCode(obj2.getString("PKLT_CD"));
                                parkingDataList.add(LastParkingData);
                            }
                        } else {
                            spaceCount++;
                            flag = false;
                            if ((i + 2) == jArray.length()) { //i=0, length =3 i+2=2 // i=1 , i+2=3,len=3//i=2 , i+1=3,len=3
//                            spaceCount++;
                                parkingData.setTotalSpace(spaceCount);
                                parkingData.setCurrentParkSpace(obj.getInt("NOW_PRK_VHCL_CNT"));
                                if (spaceCount - obj.getInt("NOW_PRK_VHCL_CNT") < 0) {
                                    parkingData.setAvailParkSpace(0);
                                } else {
                                    parkingData.setAvailParkSpace(spaceCount - obj.getInt("NOW_PRK_VHCL_CNT"));
                                }
                                parkingData.setDate(obj.getString("NOW_PRK_VHCL_UPDT_TM"));
//                    parkingData.setCrrSpaces(obj.getInt("NOW_PRK_VHCL_CNT"));
                                parkingData.setAddress(obj.getString("ADDR"));
                                parkingData.setParkingCode(obj.getString("PKLT_CD"));
                                parkingDataList.add(parkingData);
                            }
                        }
                    }
                }

            }
//            return parkingDataList;
            parkingDataService.saveParkingDatas(parkingDataList);

        } else {
            throw new IOException("Failed to fetch data from API, response code: " + conn.getResponseCode());
        }
    }
}
