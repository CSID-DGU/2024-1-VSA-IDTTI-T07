import React from 'react';
import './MLMapOverlay.css'
const MLMapOverlay = ({ 
    title,
    p_availableSpace,
    totalSpace,
    address,
    onClose 
}) => {
    return (
        <div className="overlay-info">
            <div className="overlay-title">
                {title || "미제공"}
                <div 
                    className="overlay-close" 
                    title="닫기" 
                    style={{ cursor: 'pointer' }} 
                    onClick={onClose}
                />
            </div>
            <div className="overlay-container">
                <div className="overlay-inner-container">
                    <div className="overlay-content">
                        <div>
                            <hr className="overlay-divider" />
                            <br />
                        </div>
                        <div className="overlay-parking-info-header">
                            <div className="overlay-header-item">전체 주차면</div>
                            <div className="overlay-header-item">예측 주차가능면</div>
                        </div>
                        <div className="overlay-parking-info">
                            <div className="overlay-parking-spot">{totalSpace || "미제공"}</div>
                            <div className="overlay-parking-spot">{p_availableSpace || "미제공"}</div>
                        </div>
                        <div>
                            <br />
                            <hr className="overlay-divider" />
                        </div>
                        <div className="overlay-details">
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">주소</h2>
                                <span>{address || "미제공"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MLMapOverlay;
