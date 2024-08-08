// import React,{useEffect, useState} from 'react';
// import './App.css';
// import Map from './components/Map/Map';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Map />
//       <Footer />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />           
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* 다른 페이지 라우트를 여기에 추가합니다. */}
            </Routes>
        </Router>
    );
};

export default App;
