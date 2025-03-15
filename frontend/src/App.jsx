import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register/register.jsx';
import Login from './components/Login/login.jsx';
import Home from './components/home/Home.jsx';
import './App.css'
import Admin from './components/admin/Admin.jsx';
import User from './components/user/User.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User  />} />
            </Routes>
        </Router>
    );
}

export default App;