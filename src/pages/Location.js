import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Frequent from '../components/Footer/Frequent';
import { usePrediction } from '../context/PredictionContext';
import { useNavigate } from 'react-router-dom';

const Location = () => {
    const { setPrediction } = usePrediction();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [destination, setDestination] = useState('');
    const [meridiem, setMeridiem] = useState('AM');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [weekday, setWeekday] = useState('');

    const navigate = useNavigate();

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 사용자가 선택한 시간이 오전/오후인지, 시간과 분이 무엇인지 받아와서 24시간 형식으로 변환
        let adjustedHour = parseInt(hour, 10);
        if (meridiem === 'PM' && adjustedHour !== 12) {
            adjustedHour += 12;
        } else if (meridiem === 'AM' && adjustedHour === 12) {
            adjustedHour = 0;
        }

        try {
            // 현재 날짜를 기반으로 요일 계산
            const currentDate = new Date();
            currentDate.setHours(adjustedHour);
            currentDate.setMinutes(minute);

            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const calculatedWeekday = weekdays[currentDate.getDay()];

            setWeekday(calculatedWeekday);

            // 백엔드로 GET 요청 보내기
            const response = await axios.get('http://localhost:8080/api/predict', {
                params: {
                    hour: adjustedHour,
                    minute: parseInt(minute, 10),
                    weekday: calculatedWeekday
                }
            });

            // 응답 데이터 처리
            console.log('Predictions:', response.data.predictions);
            // alert(`예측된 주차 공간: ${JSON.stringify(response.data.predictions)}`);
            setPrediction(response.data);
            navigate('/location/predict');

        } catch (error) {
            console.error('Error during prediction request:', error);
            alert('예측 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="App">
            <h1>Location Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>도착지:</label>
                    <input 
                        type="text" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                        placeholder="도착지를 입력하세요" 
                    />
                </div>
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
                <button type="submit">설정</button>
            </form>
            <Footer toggleAccordion={toggleAccordion} />
            <div className={`accordion ${isAccordionOpen ? 'open' : ''}`}>
                <div className="accordion-item">
                    <div className="accordion-body">
                        <Frequent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
