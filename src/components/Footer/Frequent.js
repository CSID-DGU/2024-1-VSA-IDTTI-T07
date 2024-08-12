import React, { useEffect, useState } from 'react';
import useFavoriteManager from '../DataControl/FavoriteManager';
import './Frequent.css';  // Frequent.css 임포트

const Frequent = () => {
    const { getFavoriteParkingData } = useFavoriteManager();
    const [favoriteParkings, setFavoriteParkings] = useState([]);

    useEffect(() => {
        const fetchFavoriteParkings = async () => {
            const data = await getFavoriteParkingData();
            setFavoriteParkings(data);
        };
        fetchFavoriteParkings();
    }, [getFavoriteParkingData]);

    return (
        <div className="frequent-container">
            <h2>주차장 즐겨찾기 목록</h2>
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
