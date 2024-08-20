// UserLogin.js
import React, { useState } from "react";
import axios from "axios";
import './UserLogin.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Auth/AuthContext'; // AuthContext 파일의 경로

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Context에서 login 함수 가져오기

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginData = {
            email,
            password
        };
        try {
            const response = await axios.post('http://172.30.1.2:8080/api/login', loginData);
            if (response.status === 200) {
                alert("안녕하세요 : " + response.data.nickname + "님");
                login(response.data); // 로그인 성공 시 Context에 사용자 데이터 저장
                navigate('/home');
            } else {
                alert("로그인 실패, 다시 시도해주세요");
            }
        } catch (error) {
            alert("로그인 실패, 다시 시도해주세요");
        }
    };

    const signupRedirect = () => {
        navigate('/signup');
    };

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>로그인</h2>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="login-button">Login</button>
                </div>
                <div>
                    <button type="button" onClick={signupRedirect} className="signup-button">Signup</button>
                </div>
                <div>
                    <button type="button" onClick={handleGoBack} className="back-button">Back</button>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
