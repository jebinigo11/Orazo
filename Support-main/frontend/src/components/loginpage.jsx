import React, { useState } from 'react';
import { motion } from 'framer-motion';


import './loginpage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [focusField, setFocusField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${formData.username}!`);
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <img src="/jebz-logo.png" alt="jebz Logo" className="logo" />

      <h1 className="login-title">Jebz Telecom Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <motion.input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          onFocus={() => setFocusField('username')}
          onBlur={() => setFocusField(null)}
          animate={focusField === 'username' ? { scale: 1.05, boxShadow: '0 0 8px #00d8ff' } : { scale: 1, boxShadow: 'none' }}
          className="login-input"
          required
        />
        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocusField('password')}
          onBlur={() => setFocusField(null)}
          animate={focusField === 'password' ? { scale: 1.05, boxShadow: '0 0 8px #00d8ff' } : { scale: 1, boxShadow: 'none' }}
          className="login-input"
          required
        />
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#0099cc' }}
          whileTap={{ scale: 0.95 }}
          className="login-button"
          type="submit"
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
}
