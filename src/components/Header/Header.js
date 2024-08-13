import React, { useState, useEffect } from 'react';
import './Header.css';
import searchIcon from '../../assets/images/search.svg';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [map, setMap] = useState(null);


    useEffect(() => {
        // 카카오 API가 로드된 상태에서 실행됨
        if (window.kakao) {
            const kakao = window.kakao;
            const mapContainer = document.createElement('div');
            document.body.appendChild(mapContainer);
            const kakaoMap = new kakao.maps.Map(mapContainer, {
                center: new kakao.maps.LatLng(37.5665, 126.978),
                level: 3,
            });
            setMap(kakaoMap);
        }
    }, []);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') return;

        if (!window.kakao || !map) {
            console.error('Kakao Map API or Map is not loaded yet.');
            return;
        }

        const kakao = window.kakao;
        const ps = new kakao.maps.services.Places();
        const searchKeyword = searchQuery.includes('주차장') ? searchQuery : `주차장 ${searchQuery}`;

        if (searchQuery.includes('주차장')) {
            ps.keywordSearch(searchQuery, (data, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    setSearchResults(data);
                } else {
                    console.error('Search error:', status);
                }
            });
        } else {
            // 주소를 검색한 경우
            ps.addressSearch(searchQuery, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const location = new kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(location);
                    ps.keywordSearch('주차장', (data, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                            setSearchResults(data);
                        } else {
                            console.error('Search error:', status);
                        }
                    });
                } else {
                    console.error('Address search error:', status);
                }
            });
        }
    };

    return (
        <>
            <header className="header">
                <h1>IDTTI</h1>
                <button className="search-button" onClick={toggleSearch}>
                    <img src={searchIcon} alt="Search" />
                </button>
            </header>
            {isSearchOpen && (
                <div className="search-panel">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                        />
                        <button type="submit">검색</button>
                    </form>
                    <div className="search-results">
                        <ul>
                            {searchResults.map(result => (
                                <li key={result.id}>
                                    <strong>{result.place_name}</strong>
                                    <p>{result.address_name}</p>
                                    <p>{result.phone}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
