// Header.js
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
        // 추가로 검색 처리를 여기에서 할 수 있습니다.
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
                </div>
            )}
        </>
    );
};

export default Header;
