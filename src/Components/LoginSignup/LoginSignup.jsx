import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./LoginSignup.css";

import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '', username: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const API_BASE_URL = 'https://reqres.in/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: formValues.email,
        password: formValues.password,
      });

      if (response.data.token === 'QpwL5tke4Pnpja7X4') {
        console.log('Login successful:', response.data);
        navigate('/dashboard');
      } else {
        console.error('Invalid email or password');
        setFormErrors({ login: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('API Error:', error.response.data);
      setFormErrors({ login: 'Invalid email or password' });
    } finally {
      setIsSubmit(false);
    }
  };

  const validateSignup = () => {
    const errors = {};
  
    if (!formValues.email) {
      errors.email = 'Email is required';
    }
  
    if (!formValues.password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = isSignUp ? validateSignup() : validateLogin();
    setFormErrors(errors);
    setIsSubmit(true);
  
    if (Object.keys(errors).length === 0) {
      try {
        let response;
        if (isSignUp) {
          response = await axios.post(`${API_BASE_URL}/register`, {
            email: formValues.email,
            password: formValues.password,
          });
          console.log('Signup successful:', response.data);
        } else {
          response = await axios.post(`${API_BASE_URL}/login`, {
            email: formValues.email,
            password: formValues.password,
          });
          console.log('Login successful:', response.data);
        }
        console.log(response.status);

        if (response.status === 200) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('API Error:', error.response.data);
        setFormErrors({ login: 'Invalid email or password' });
      } finally {
        setIsSubmit(false);
      }
    }
  };
  
  
  return (
    <div className="container">
      <div className="header">
        <div className="text">{isSignUp ? 'Sign Up' : 'Login'}</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="input">
            <img src={user_icon} alt="user" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
            {formErrors.username && (
              <div className="error-message">{formErrors.username}</div>
            )}
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <div className="error-message">{formErrors.email}</div>
          )}
        </div>

        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <div className="error-message">{formErrors.password}</div>
          )}
        </div>

        <div className="links-container">
          {!isSignUp && (
            <div
              className="forgot-container"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Don't have an account? Click here to sign up.
            </div>
          )}
          {isSignUp && (
            <div
              className="forgot-container"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Already have an account? Click here to login.
            </div>
          )}
          {!isSignUp && (
            <div
              className="forgot-container"
              onClick={() => console.log('Forgot password clicked')}
            >
              Forgot password?
            </div>
          )}
        </div>

        <div className="submit-container">
          <button type="submit" className="submit">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
