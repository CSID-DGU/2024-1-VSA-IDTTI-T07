import React, { useEffect } from 'react';
import axios from 'axios';

const SendCodesComponent = ({ codes }) => {
    useEffect(() => {
        if (codes.length > 0) {
            // API 요청 함수 호출
            fetchFilteredData(codes);
        }
    }, [codes]);

    const fetchFilteredData = async (codes) => {
        try {
            const response = await axios.post('http://localhost:8080/api/distance', { codes });
            console.log('Received Data:', response.data);
            // 받은 데이터를 상위 컴포넌트나 context로 전달하는 로직을 여기에 추가 가능
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    return null; // 렌더링할 것이 없으므로 null 반환
};

export default SendCodesComponent;
