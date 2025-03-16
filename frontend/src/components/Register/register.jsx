import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/auth/register`, { username, password, role });
            if (role === 'admin') {
                navigate('/admin'); 
            } else {
                navigate('/user'); 
            }
        } catch (error) {
            const errorMsg = error.response ? error.response.data : 'Registration failed: Unknown error';
            setErrorMessage(errorMsg); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="user">User </option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
            {errorMessage && <p>{errorMessage}</p>} 
            <a href="/">Back</a>
        </form>
    );
};

export default Register;