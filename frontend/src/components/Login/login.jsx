import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            const userRole = response.data.role;
            if (userRole === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            const errorMsg = error.response ? error.response.data : 'Login failed: Unknown error';
            setErrorMessage(errorMsg);
            alert('Login failed: ' + errorMsg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            {errorMessage && <p>{errorMessage}</p>}
            <a href="/">Back</a>
        </form>
    );
};

export default Login;