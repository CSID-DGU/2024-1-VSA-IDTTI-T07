import React, { useState } from "react";
import MyLocationMarker from "./MyLocationMarker";
import './MyLocationButton.css';
import myLocationImg from '../../assets/images/mylocation.svg';

const MyLocationButton = ({ map }) => {
    const [marker, setMarker] = useState(null);

    const myLocation = () => {
        if (map) {
            MyLocationMarker(map, marker, setMarker);
        }
    };

    return (
        <div className="myLocation">
            <span className="checkMyLocation" onClick={myLocation}>
                <img src={myLocationImg} alt="내 위치" />
            </span>
        </div>
    );
};

export default MyLocationButton;
