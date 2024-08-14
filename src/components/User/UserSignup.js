import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();
        const signupData = {
            email,
            password,
            nickname,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/signup', signupData);
            if (response.status === 200) {
                alert('회원가입 성공!');
                navigate('/login'); // 로그인 성공 시 홈 페이지로 리다이렉트
            } else if (response.status === 400) {
                alert('회원가입 실패 , 다시 시도해주세요.');
            }
        } catch (error) {
            alert('Error occurred during signup. Please try again.');
        }
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup} className="signup-form">
                
                <label>이메일:</label>
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>비밀번호:</label>
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>닉네임:</label>
                <br />
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
                <button type="submit" className='signup-button'>Signup</button>
                <button type="button" onClick={handleBack} className="back-button">Back</button>
            </form>
        </div>
    );
};

export default UserSignup;
