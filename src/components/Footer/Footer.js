import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import homeIcon from '../../assets/images/home.svg';
import frequentIcon from '../../assets/images/frequent.svg';
import locationIcon from '../../assets/images/location.svg';
import './Footer.css';

const Footer = ({ toggleAccordion }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleFrequentClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            toggleAccordion();
        }
    };

    return (
        <footer className="footer">
            <Link to="/" className="footer-button">
                <img src={homeIcon} alt="Home" />
            </Link>
            <button onClick={handleFrequentClick} className="footer-button">
                <img src={frequentIcon} alt="Frequent" />
            </button>
            <Link to="/location" className="footer-button">
                <img src={locationIcon} alt="Location" />
            </Link>
        </footer>
    );
};

export default Footer;
