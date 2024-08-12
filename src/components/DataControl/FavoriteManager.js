import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

// 즐겨찾기 상태를 서버에 저장하는 함수
const useFavoriteManager = () => {
    const { user } = useAuth();

    const saveFavorite = async (positionCode, isFavorite) => {
        try {
            await axios.post('http://localhost:8080/api/favorite', {
                email: user.email, // 현재 사용자 이메일
                code: positionCode, // 마커의 고유 코드
                favorite: isFavorite // 즐겨찾기 상태
            });
        } catch (error) {
            console.error('Failed to save favorite:', error);
            // 사용자에게 에러 메시지 표시 (선택 사항)
            alert('즐겨찾기 저장에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return { saveFavorite };
};

export default useFavoriteManager;
