import React, { useState, useEffect } from 'react';
import './MapOverlay.css'; // 새롭게 생성한 CSS 파일 import

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
    onClose,
    onFavoriteToggle,
    isFavorite
}) => {
    const [favoriteState, setFavoriteState] = useState(isFavorite);

    useEffect(() => {
        setFavoriteState(isFavorite);
    }, [isFavorite]);

    const handleFavoriteClick = () => {
        const newFavoriteState = !favoriteState;
        setFavoriteState(newFavoriteState);
        onFavoriteToggle(newFavoriteState);
    };

    const preventMapScroll = (event) => {
        event.stopPropagation(); // 이벤트 버블링을 중지시켜 지도에 영향을 미치지 않도록 함
    };

    return (
        <div className="overlay-info" onWheel={preventMapScroll}>
            <div className="overlay-title">
            <button
                    className="overlay-favorite-button"
                    style={{ cursor: 'pointer', color: favoriteState ? 'red' : 'gray' }}
                    onClick={handleFavoriteClick}
                >
                    {favoriteState ? '★' : '☆'}
                </button>
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
                            <div className="overlay-header-item">주차 가능면</div>
                        </div>
                        <div className="overlay-parking-info">
                            <div className="overlay-parking-spot">{totalSpace || "미제공"}</div>
                            <div className="overlay-parking-spot">{availParkSpace || "미제공"}</div>
                        </div>
                        <div>
                            <br />
                            <hr className="overlay-divider" />
                        </div>
                        <div className="overlay-details">
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">5분당 요금</h2>
                                <span>{(additionalFee + "원" || "미제공")}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">주소</h2>
                                <span>{address || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">전화번호</h2>
                                <span>{phoneNumber || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">주차장 종류</h2>
                                <span>{parkingType || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">유료 / 무료</h2>
                                <span>{freeOrNot || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">야간 무료 개방</h2>
                                <span>{nightFreeOpenName || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">평일 운영 시간</h2>
                                <span>{weekdayOpenTime || "미제공"} - {weekdayCloseTime || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">주말 운영 시간</h2>
                                <span>{weekendOpenTime || "미제공"} - {weekendCloseTime || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">공휴일 운영 시간</h2>
                                <span>{holidayOpenTime || "미제공"} - {holidayCloseTime || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">토요일 유/무료</h2>
                                <span>{saturdayFreeOrNot || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">공휴일 유/무료</h2>
                                <span>{holidayFreeOrNot || "미제공"}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">월 정기권 금액</h2>
                                <span>{(monthlyTicketAmount + "원" || "미제공")}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">기본 주차 요금</h2>
                                <span>{(baseParkingFee + "원" || "미제공")}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">기본 주차 시간</h2>
                                <span>{(baseParkingTime + "분" || "미제공")}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">추가 요금</h2>
                                <span>{(additionalFee + "원" || "미제공")}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">추가 시간</h2>
                                <span>{(additionalTime + "분" || "미제공")}</span>
                            </div>
                            <div className="overlay-detail-item">
                                <h2 className="overlay-detail-title">일 최대 요금</h2>
                                <span>{(maxDailyFee + "원" || "미제공")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapOverlay;
