import React, { useState } from 'react';
import '../App.css';
import MLMap from '../components/Prediction/MLMap';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Frequent from '../components/Footer/Frequent';

function Predict() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="App">
      <Header />
      <MLMap />
      <Footer toggleAccordion={toggleAccordion} />
      <div className={`accordion ${isAccordionOpen ? 'open' : ''}`}>
        <div className="accordion-item">
          <div className="accordion-body">
            <button className="close-button" onClick={toggleAccordion}>
              닫기
            </button>
            <Frequent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predict;
