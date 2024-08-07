import React from 'react';
import './ZoomButton.css'; // CSS 파일 분리하여 스타일 관리


const ZoomButton = ({ map }) => {
    const zoomIn = () => {
        if (map) {
            map.setLevel(map.getLevel() - 1);
        }
    };

    const zoomOut = () => {
        if (map) {
            map.setLevel(map.getLevel() + 1);
        }
    };

    return (
        <div className="custom_zoomcontrol radius_border">
            <span className="zoomIn" onClick={zoomIn}>
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
            </span>  
            <span className="zoomOut" onClick={zoomOut}>
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
            </span>
        </div>
    );
};


export default ZoomButton;