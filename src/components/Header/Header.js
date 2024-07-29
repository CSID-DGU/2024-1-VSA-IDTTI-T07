import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import searchIcon from '../../assets/images/search.svg';

const Header = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <header className="header">
            <h1>IDTTI</h1>
            <button className="search-button" onClick={handleSearchClick}>
                <img src={searchIcon} alt="Search" />
            </button>
        </header>
    );
};

export default Header;
