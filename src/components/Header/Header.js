import React from 'react';
import { useSearch } from '../Map/SearchContext';
import './Header.css';
import searchIcon from '../../assets/images/search.svg';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const { setSearchQuery: setGlobalSearchQuery } = useSearch();

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') return;
        setGlobalSearchQuery(searchQuery);
        setIsSearchOpen(false); // 검색 완료 후 검색창 닫기
    };

    return (
        <header className="header">
            <h1>최적의 주차장 찾기</h1>
            <div className="search-container">
                <button className="search-button" onClick={toggleSearch}>
                    <img src={searchIcon} alt="Search" />
                </button>
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
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
