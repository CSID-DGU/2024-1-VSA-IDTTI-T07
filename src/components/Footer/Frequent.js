import React, { useEffect, useState } from 'react';
import useFavoriteManager from '../DataControl/FavoriteManager';
import './Frequent.css';  // Frequent.css 임포트

const Frequent = () => {
    const { getFavoriteParkingData } = useFavoriteManager();
    const [favoriteParkings, setFavoriteParkings] = useState([]);

    const fetchFavoriteParkings = async () => {
        const data = await getFavoriteParkingData();
        setFavoriteParkings(data);
    };

    useEffect(() => {
        fetchFavoriteParkings(); // 컴포넌트가 처음 로드될 때 한 번 호출
    }, []);

    return (
        <div className="frequent-container">
            <h2>주차장 즐겨찾기 목록</h2>
            <button onClick={fetchFavoriteParkings}>즐겨찾기 목록 새로고침</button>
            <ul className="frequent-list">
                {favoriteParkings.map(parking => (
                    <li key={parking.code}>
                        <strong>{parking.parkingName}</strong>
                        <span>남은 주차 자리: {parking.availParkSpace}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Frequent;
