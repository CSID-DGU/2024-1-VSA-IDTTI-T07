package com.example.parkingV_2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity
@Table(name = "Parking_Codes")
public class ParkingCodes {
    @Id
    private String code; //PKLT_CD

    @Column(name = "parking_name") // 주차장명 PKLT_NM
    private String parkingName;

    @Column(name = "address") // 주소 ADDR
    private String address;

    @Column(name = "parking_type") // 주차장 종류명 PRK_TYPE_NM
    private String parkingType;

    @Column(name = "operation_type") // 운영구분명 OPER_SE
    private String operationType;

    @Column(name = "phone_number") // 전화번호 TELNO
    private String phoneNumber;

    @Column(name = "free_or_not") // 유무료구분명 PAY_YN_NM
    private String freeOrNot;

    @Column(name = "night_free_open_name") // 야간무료개방여부명 NGHT_PAY_YN_NM
    private String nightFreeOpenName;

    @Column(name = "weekday_open_time") // 평일 운영 시작시각(HHMM) WD_OPER_BGNG_TM
    private String weekdayOpenTime;

    @Column(name = "weekday_close_time") // 평일 운영 종료시각(HHMM) WD_OPER_END_TM
    private String weekdayCloseTime;

    @Column(name = "weekend_open_time") // 주말 운영 시작시각(HHMM) WE_OPER_BGNG_TM
    private String weekendOpenTime;

    @Column(name = "weekend_close_time") // 주말 운영 종료시각(HHMM) WE_OPER_END_TM
    private String weekendCloseTime;

    @Column(name = "holiday_open_time") // 공휴일 운영 시작시각(HHMM) LHLDY_OPER_BGNG_TM
    private String holidayOpenTime;

    @Column(name = "holiday_close_time") // 공휴일 운영 종료시각(HHMM) LHLDY_OPER_END_TM
    private String holidayCloseTime;

    @Column(name = "saturday_free_or_not") // 토요일 유,무료 구분명 SAT_CHGD_FREE_NM
    private String saturdayFreeOrNot;

    @Column(name = "holiday_free_or_not") // 공휴일 유,무료 구분명 LHLDY_CHGD_FREE_SE_NAME
    private String holidayFreeOrNot;

    @Column(name = "monthly_ticket_amount") // 월 정기권 금액 PRD_AMT
    private String monthlyTicketAmount;

    @Column(name = "base_parking_fee") // 기본 주차 요금 BSC_PRK_CRG
    private int baseParkingFee;

    @Column(name = "base_parking_time") // 기본 주차 시간(분 단위) BSC_PRK_HR
    private int baseParkingTime;

    @Column(name = "additional_fee") // 추가 단위 요금 ADD_PRK_CRG
    private int additionalFee;

    @Column(name = "additional_time") // 추가 단위 시간(분 단위) ADD_PRK_HR
    private int additionalTime;

    @Column(name = "max_daily_fee") // 일 최대 요금 DAY_MAX_CRG
    private int maxDailyFee;

    @Column(name = "latitude") // 주차장 위치 좌표 위도 LAT
    private double latitude;

    @Column(name = "longitude") // 주차장 위치 좌표 경도 LOT
    private double longitude;

}