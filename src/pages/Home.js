import React, { useState } from 'react';
import '../App.css';
import Map from '../components/Map/Map';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Frequent from '../components/Footer/Frequent';

function Home() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="App">
      <Header />
      <Map />
      <Footer toggleAccordion={toggleAccordion} />
      <div className={`accordion ${isAccordionOpen ? 'open' : ''}`}>
        <div className="accordion-item">
          <div className="accordion-body">
            <Frequent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
