import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/images/home.svg';
import frequentIcon from '../../assets/images/frequent.svg';
import locationIcon from '../../assets/images/location.svg';
import './Footer.css';

const Footer = ({ toggleAccordion }) => {
    return (
        <footer className="footer">
            <Link to="/" className="footer-button">
                <img src={homeIcon} alt="Home" />
            </Link>
            <button onClick={toggleAccordion} className="footer-button">
                <img src={frequentIcon} alt="Frequent" />
            </button>
            <Link to="/location" className="footer-button">
                <img src={locationIcon} alt="Location" />
            </Link>
        </footer>
    );
};

export default Footer;
