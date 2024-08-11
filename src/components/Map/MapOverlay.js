import React, { useState } from 'react';

const MapOverlay = ({ 
    title,
    availParkSpace,
    totalSpace,
    address,
    parkingType,
    operationType,
    phoneNumber,
    freeOrNot,
    nightFreeOpenName,
    weekdayOpenTime,
    weekdayCloseTime,
    weekendOpenTime,
    weekendCloseTime,
    holidayOpenTime,
    holidayCloseTime,
    saturdayFreeOrNot,
    holidayFreeOrNot,
    monthlyTicketAmount,
    baseParkingFee,
    baseParkingTime,
    additionalFee,
    additionalTime,
    maxDailyFee,
    onClose, // 닫기 버튼 핸들러
    onFavoriteToggle // 즐겨찾기 버튼 핸들러
}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        onFavoriteToggle(newFavoriteState); // 부모 컴포넌트에 상태 전송
    };

    return (
        <div className="info">
            <div className="title">
                {title || "미제공"}
                <div 
                    className="close" 
                    title="닫기" 
                    style={{ cursor: 'pointer' }} 
                    onClick={onClose} // 닫기 버튼 클릭 핸들러
                />
                <button 
                    className="favorite-button" 
                    style={{ cursor: 'pointer', color: isFavorite ? 'red' : 'gray' }}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? '♥ 즐겨찾기' : '♡ 즐겨찾기'}
                </button>
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
                            <div className="header-item">주차 가능면</div>
                        </div>
                        <div className="parking-info">
                            <div className="parking-spot">{totalSpace || "미제공"}</div>
                            <div className="parking-spot">{availParkSpace || "미제공"}</div>
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
                            <div className="detail-item">
                                <h2 className="detail-title">전화번호</h2>
                                <span>{phoneNumber || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">주차장 종류</h2>
                                <span>{parkingType || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">유료 / 무료</h2>
                                <span>{freeOrNot || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">야간 무료 개방</h2>
                                <span>{nightFreeOpenName || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">평일 운영 시간</h2>
                                <span>{weekdayOpenTime || "미제공"} - {weekdayCloseTime || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">주말 운영 시간</h2>
                                <span>{weekendOpenTime || "미제공"} - {weekendCloseTime || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">공휴일 운영 시간</h2>
                                <span>{holidayOpenTime || "미제공"} - {holidayCloseTime || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">토요일 유/무료</h2>
                                <span>{saturdayFreeOrNot || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">공휴일 유/무료</h2>
                                <span>{holidayFreeOrNot || "미제공"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">월 정기권 금액</h2>
                                <span>{(monthlyTicketAmount || "미제공") + "원"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">기본 주차 요금</h2>
                                <span>{(baseParkingFee || "미제공") + "원"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">기본 주차 시간</h2>
                                <span>{(baseParkingTime || "미제공") + "분"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">추가 단위 요금</h2>
                                <span>{(additionalFee || "미제공") + "원"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">추가 단위 시간</h2>
                                <span>{(additionalTime || "미제공") + "분"}</span>
                            </div>
                            <div className="detail-item">
                                <h2 className="detail-title">일 최대 요금</h2>
                                <span>{(maxDailyFee || "미제공") + "원"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapOverlay;
