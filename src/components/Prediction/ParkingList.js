import React from 'react';

const ParkingList = ({ data }) => {
    return (
        <div className="data-list">
            <h2>주차장 정보</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <h3>{item.parkingName}</h3>
                        <p>주소: {item.address}</p>
                        <p>기본 주차 요금: {item.baseParkingFee} 원</p>
                        <p>최대 일일 요금: {item.maxDailyFee} 원</p>
                        <p>남은 주차 공간: {item.p_availableSpace}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingList;
