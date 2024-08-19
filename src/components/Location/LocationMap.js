// LocationMapCom.js
import React from 'react';
import './LocationMap.css';

const LocationMap = ({
    hour,
    setHour,
    minute,
    setMinute,
    meridiem,
    setMeridiem,
    weekday,
    setWeekday,
    handleSubmit
}) => {
    return (
        <div className="location-map-container">
            <div id="map">
                {/* 지도 컴포넌트가 들어가는 위치 */}
            </div>
            <div className="location-form-wrapper">
                <form className="location-form" onSubmit={handleSubmit}>
                    <div>
                        <label>도착 시간:</label>
                        <select 
                            value={meridiem} 
                            onChange={(e) => setMeridiem(e.target.value)}
                        >
                            <option value="AM">오전</option>
                            <option value="PM">오후</option>
                        </select>
                        <input 
                            type="number" 
                            value={hour} 
                            onChange={(e) => setHour(e.target.value)} 
                            placeholder="시" 
                            min="1" 
                            max="12"
                        />
                        <span>:</span>
                        <input 
                            type="number" 
                            value={minute} 
                            onChange={(e) => setMinute(e.target.value)} 
                            placeholder="분" 
                            min="0" 
                            max="59"
                        />
                    </div>
                    <div>
                        <label>요일:</label>
                        <select 
                            value={weekday} 
                            onChange={(e) => setWeekday(e.target.value)}
                        >
                            <option value="Sunday">일요일</option>
                            <option value="Monday">월요일</option>
                            <option value="Tuesday">화요일</option>
                            <option value="Wednesday">수요일</option>
                            <option value="Thursday">목요일</option>
                            <option value="Friday">금요일</option>
                            <option value="Saturday">토요일</option>
                        </select>
                    </div>
                    <button type="submit">설정</button>
                </form>
            </div>
        </div>
    );
};

export default LocationMap;
