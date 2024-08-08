// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext'; // AuthContext 파일의 경로
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExampleComponent from './pages/ExampleComponent'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/example" element={<ExampleComponent />} />
                    {/* 다른 페이지 라우트를 여기에 추가합니다. */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
