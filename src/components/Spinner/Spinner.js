// src/components/Spinner/Spinner.js
import React from 'react';
import './Spinner.css';

const Spinner = () => (
    <div className="spinner-overlay">
        <div className="spinner"></div>
        <div className="spinner-text">
            <p>빈자리를 예측중입니다.</p>
            <p>잠시만 기다려주세요.</p>
        </div>
    </div>
);

export default Spinner;
