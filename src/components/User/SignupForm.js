import React, { useState } from 'react';

const SignupForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password, nickname });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>회원가입</h2>
            <div>
                <label>이메일:</label>
                <br/>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </div>
            <div>
                <label>비밀번호:</label>
                <br/>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
            </div>
            <div>
                <label>닉네임:</label>
                <br/>
                <input 
                    type="text" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required 
                />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default SignupForm;
