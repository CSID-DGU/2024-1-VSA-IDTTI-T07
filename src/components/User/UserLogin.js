import React,{useState} from "react";
import axios from "axios";
import './UserLogin.css'; // 추가된 부분
import { useNavigate } from "react-router-dom";

const UserLogin = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) =>{
        event.preventDefault();
        const loginData ={
            email,
            password
        };
        try{
            const response = await axios.post('http://localhost:8080/api/login',loginData);
            if(response.status === 200){
                alert("안녕하세요 : " +response.data.nickname+ "님");
                navigate('/home'); // 로그인 성공 시 홈 페이지로 리다이렉트
            }else{
                alert("로그인 실패 , 다시 시도해주세요");
            }
        }catch(error){
            alert("로그인 실패 , 다시 시도해주세요");
        }
    };
    const signupRedirect= ()=>{
        navigate('/signup')
    }

    return(
        <div className="login-form-container">
            <form onSubmit={handleLogin} className="login-form">
            <h2>로그인</h2>
            <div className="form-group">
                <label htmlFor="username">이메일</label>
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
            <button type="submit" onClick={signupRedirect} className="signup-button">Signup</button>
            </div>
            </form>
        </div>
    );

};

export default UserLogin;