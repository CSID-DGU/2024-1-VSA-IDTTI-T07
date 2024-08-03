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
    maxDailyFee
 }) => {

    // null 체크 후 기본값 설정
    const displayTitle = title || "미제공";
    const displayAvailParkSpace = availParkSpace || "미제공";
    const displayTotalSpace = totalSpace || "미제공";
    const displayAddress = address || "미제공";
    const displayParkingType = parkingType || "미제공";
    const displayOperationType = operationType || "미제공";
    const displayPhoneNumber = phoneNumber || "미제공";
    const displayFreeOrNot = freeOrNot || "미제공";
    const displayNightFreeOpenName = nightFreeOpenName || "미제공";
    const displayWeekdayOpenTime = weekdayOpenTime || "미제공";
    const displayWeekdayCloseTime = weekdayCloseTime || "미제공";
    const displayWeekendOpenTime = weekendOpenTime || "미제공";
    const displayWeekendCloseTime = weekendCloseTime || "미제공";
    const displayHolidayOpenTime = holidayOpenTime || "미제공";
    const displayHolidayCloseTime = holidayCloseTime || "미제공";
    const displaySaturdayFreeOrNot = saturdayFreeOrNot || "미제공";
    const displayHolidayFreeOrNot = holidayFreeOrNot || "미제공";
    const displayMonthlyTicketAmount = monthlyTicketAmount+"원" || "미제공";
    const displayBaseParkingFee = baseParkingFee+"원" || "미제공";
    const displayBaseParkingTime = baseParkingTime+"분" || "미제공";
    const displayAdditionalFee = additionalFee+"원" || "미제공";
    const displayAdditionalTime = additionalTime+"분" || "미제공";
    const displayMaxDailyFee = maxDailyFee+"원" || "미제공";

    const overlayContent = `
        <div class="info">
            <div class="title">
                ${displayTitle}
                <div class="close" title="닫기" style="cursor:pointer;"></div>
            </div>
            <div class="container">
                <div class="inner-container">
                    <div class="content">
                    <div>
                        <hr class="divider" />
                        <br />
                    </div>
                    <div class="parking-info-header">
                        <div class="header-item">전체 주차면</div>
                        <div class="header-item">주차 가능면</div>
                    </div>
                    <div class="parking-info">
                        <div class="parking-spot">${displayTotalSpace}</div>
                        <div class="parking-spot">${displayAvailParkSpace}</div>
                    </div>
                    <div>
                        <br />
                        <hr class="divider" />
                    </div>
                    <div class="details">
                        <div class="detail-item">
                        <h2 class="detail-title">주소</h2>
                        <span>${displayAddress}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">전화번호</h2>
                        <span>${displayPhoneNumber}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">주차장 종류</h2>
                        <span>${displayParkingType}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">유료 / 무료</h2>
                        <span>${displayFreeOrNot}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">야간 무료 개방</h2>
                        <span>${displayNightFreeOpenName}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">평일 운영 시간</h2>
                        <span>${displayWeekdayOpenTime} - ${displayWeekdayCloseTime}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">주말 운영 시간</h2>
                        <span>${displayWeekendOpenTime} - ${displayWeekendCloseTime}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">공휴일 운영 시간</h2>
                        <span>${displayHolidayOpenTime} - ${displayHolidayCloseTime}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">토요일 유/무료</h2>
                        <span>${displaySaturdayFreeOrNot}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">공휴일 유/무료</h2>
                        <span>${displayHolidayFreeOrNot}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">월 정기권 금액</h2>
                        <span>${displayMonthlyTicketAmount}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">기본 주차 요금</h2>
                        <span>${displayBaseParkingFee}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">기본 주차 시간</h2>
                        <span>${displayBaseParkingTime}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">추가 단위 요금</h2>
                        <span>${displayAdditionalFee}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">추가 단위 시간</h2>
                        <span>${displayAdditionalTime}</span>
                        </div>
                        <div class="detail-item">
                        <h2 class="detail-title">일 최대 요금</h2>
                        <span>${displayMaxDailyFee}</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return overlayContent;
};

export default MapOverlay;
