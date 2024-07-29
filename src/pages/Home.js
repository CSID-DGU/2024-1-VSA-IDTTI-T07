import React,{useEffect, useState} from 'react';
import '../App.css';
import Map from '../components/Map/Map';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <div className="App">
      <Header />
      <Map />
      <Footer />
    </div>
  );
}

export default Home;