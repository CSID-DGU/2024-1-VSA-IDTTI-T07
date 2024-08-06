import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />           
                <Route path="/search" element={<Search />} />
                {/* 다른 페이지 라우트를 여기에 추가합니다. */}
            </Routes>
        </Router>
    );
};

export default App;
