import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Frequent from '../components/Footer/Frequent';
import { usePrediction } from '../context/PredictionContext'; // 예측 데이터 저장을 위한 context
import { useNavigate } from 'react-router-dom';

const Location = () => {
    const { setPrediction } = usePrediction(); // context에서 예측 데이터를 저장할 수 있는 함수
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

        let adjustedHour = parseInt(hour, 10);
        if (meridiem === 'PM' && adjustedHour !== 12) {
            adjustedHour += 12;
        } else if (meridiem === 'AM' && adjustedHour === 12) {
            adjustedHour = 0;
        }

        try {
            const currentDate = new Date();
            currentDate.setHours(adjustedHour);
            currentDate.setMinutes(minute);

            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const calculatedWeekday = weekdays[currentDate.getDay()];

            setWeekday(calculatedWeekday);

            const response = await axios.get('http://localhost:8080/api/predict', {
                params: {
                    hour: adjustedHour,
                    minute: parseInt(minute, 10),
                    weekday: calculatedWeekday
                }
            });

            // 예측 결과를 context에 저장
            setPrediction(response.data);

            // 예측 페이지로 이동
            navigate('/location/predict');

        } catch (error) {
            console.error('예측 요청 중 오류가 발생했습니다:', error);
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
