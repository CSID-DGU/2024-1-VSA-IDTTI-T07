import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { useState, useEffect } from 'react';

// 즐겨찾기 상태를 서버에 저장하고 불러오는 함수
const useFavoriteManager = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8080/api/favorite?email=${user.email}`)
                .then(response => {
                    const favoriteData = response.data.reduce((acc, item) => {
                        acc[item.code] = item.favorite;
                        return acc;
                    }, {});
                    setFavorites(favoriteData);
                })
                .catch(error => {
                    console.error('Failed to load favorites:', error);
                });
        }
    }, [user]);

    const saveFavorite = async (positionCode, isFavorite) => {
        try {
            await axios.post('http://localhost:8080/api/favorite', {
                email: user.email, // 현재 사용자 이메일
                code: positionCode, // 마커의 고유 코드
                favorite: isFavorite // 즐겨찾기 상태
            });
            setFavorites(prev => ({ ...prev, [positionCode]: isFavorite }));
        } catch (error) {
            console.error('Failed to save favorite:', error);
            alert('즐겨찾기 저장에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return { favorites, saveFavorite };
};

export default useFavoriteManager;
