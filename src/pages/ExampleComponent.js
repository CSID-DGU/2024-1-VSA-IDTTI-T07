// ExampleComponent.js
import React from 'react';
import { useAuth } from '../components/Auth/AuthContext'; // AuthContext 파일의 경로

const ExampleComponent = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.nickname}!</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Please log in</p>
            )}
        </div>
    );
};

export default ExampleComponent;
