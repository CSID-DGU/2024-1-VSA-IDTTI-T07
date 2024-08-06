import React from 'react';
import './ZoomButton.css'; // CSS 파일 분리하여 스타일 관리


const ZoomButton = ({ onZoomIn, onZoomOut }) => {
        return (
        <div className="custom_zoomcontrol radius_border">
            <span className="zoomIn" onClick={onZoomIn}>
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
            </span>  
            <span className="zoomOut" onClick={onZoomOut}>
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
            </span>
        </div>
    );
};


export default ZoomButton;