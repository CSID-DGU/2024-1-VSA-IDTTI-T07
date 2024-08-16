import React from 'react';

const MLMapOverlay = ({ 
    title,
    p_availableSpace,
    totalSpace,
    address,
    onClose 
}) => {
    return (
        <div className="info">
            <div className="title">
                {title || "미제공"}
                <div 
                    className="close" 
                    title="닫기" 
                    style={{ cursor: 'pointer' }} 
                    onClick={onClose}
                />
            </div>
            <div className="container">
                <div className="inner-container">
                    <div className="content">
                        <div>
                            <hr className="divider" />
                            <br />
                        </div>
                        <div className="parking-info-header">
                            <div className="header-item">전체 주차면</div>
                            <div className="header-item">예측 주차가능면</div>
                        </div>
                        <div className="parking-info">
                            <div className="parking-spot">{totalSpace || "미제공"}</div>
                            <div className="parking-spot">{p_availableSpace || "미제공"}</div>
                        </div>
                        <div>
                            <br />
                            <hr className="divider" />
                        </div>
                        <div className="details">
                            <div className="detail-item">
                                <h2 className="detail-title">주소</h2>
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
