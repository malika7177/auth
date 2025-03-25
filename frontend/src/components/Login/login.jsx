import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password });
            console.log(response.data)
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
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <a href="/">Back</a>
        </form>
    );
};

export default Login;