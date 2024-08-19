import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import Frequent from '../components/Footer/Frequent';
import { usePrediction } from '../context/PredictionContext';
import { useNavigate } from 'react-router-dom';
import LocationMap from '../components/Location/LocationMapCom';
import Header from '../components/Header/Header';
import './Location.css';
import Spinner from '../components/Spinner/Spinner'; // 스피너 컴포넌트 불러오기

const Location = () => {
    const { setPrediction } = usePrediction();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [meridiem, setMeridiem] = useState('AM');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [weekday, setWeekday] = useState('Sunday');
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const navigate = useNavigate();

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // 로딩 시작

        let adjustedHour = parseInt(hour, 10);
        if (meridiem === 'PM' && adjustedHour !== 12) {
            adjustedHour += 12;
        } else if (meridiem === 'AM' && adjustedHour === 12) {
            adjustedHour = 0;
        }

        try {
            const response = await axios.get('http://localhost:8080/api/predict', {
                params: {
                    hour: adjustedHour,
                    minute: parseInt(minute, 10),
                    weekday: weekday
                }
            });

            setPrediction(response.data);
            navigate('/location/predict');

        } catch (error) {
            console.error('예측 요청 중 오류가 발생했습니다:', error);
            alert('예측 요청 중 오류가 발생했습니다.');
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="location-map">
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
                <LocationMap />
            </div>
            <Footer toggleAccordion={toggleAccordion} />
            <div className={`accordion ${isAccordionOpen ? 'open' : ''}`}>
                <div className="accordion-item">
                    <div className="accordion-body">
                        <Frequent />
                    </div>
                </div>
            </div>
            {loading && <Spinner />} {/* 로딩 중 스피너 표시 */}
        </div>
    );
};

export default Location;
