import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const initialValues = { Email: '', Password: '', Username: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const users = [
    { username: 'Gopas', email: 'gopas@gmail.com', password: '123456789' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateLogin = () => {
    const userExists = users.some((u) => u.email === formValues.Email);
    
    if (!userExists) {
      return { login: 'User not found' };
    }
  
    const isValidLogin = users.some(
      (u) => u.email === formValues.Email && u.password === formValues.Password
    );
  
    return isValidLogin ? {} : { login: 'Invalid email or password' };
  };
  

  const validateSignup = () => {
    const errors = {};

    if (!formValues.Email) {
      errors.Email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.Email)) {
      errors.Email = 'Invalid email address';
    }

    if (!formValues.Username && isSignUp) {
      errors.Username = 'Username is required';
    }

    if (!formValues.Password) {
      errors.Password = 'Password is required';
    } else if (formValues.Password.length < 8) {
      errors.Password = 'Password must be at least 8 characters long';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = isSignUp ? validateSignup() : validateLogin();
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      if (isSignUp) {
        const newUser = { email: formValues.Email, password: formValues.Password, username: formValues.Username };
        users.push(newUser);

        console.log('Successfully signed up:', newUser);
        // Additional logic for sign-up
      } else {
        console.log('Login successful:', formValues);
        setUser({ name: 'Gopas', email: formValues.Email });
        setFormValues(initialValues);
        setFormErrors({});
        setIsSubmit(false);
      }
    }
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit && !isSignUp ? (
        <div className="ui message success">Signed in Successfully </div>
      ) : null}

{/*
return (
  <div className="container">
    {Object.keys(formErrors).length === 0 && isSubmit && !isSignUp ? (
      <div className="ui message success">Signed in Successfully </div>
    ) : (
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
    ) 
    }
  */}
    
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
              name="Username"
              value={formValues.Username}
              onChange={handleChange}
            />
            {formErrors.Username && <div className="error-message">{formErrors.Username}</div>}
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="text"
            placeholder="Email"
            name="Email"
            value={formValues.Email}
            onChange={handleChange}
          />
          {formErrors.Email && <div className="error-message">{formErrors.Email}</div>}
        </div>

        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            value={formValues.Password}
            onChange={handleChange}
          />
          {formErrors.Password && <div className="error-message">{formErrors.Password}</div>}
        </div>

        <div className="links-container">
          {!isSignUp && (
            <div className="forgot-container" onClick={() => setIsSignUp(!isSignUp)}>
              Don't have an account? Click here to sign up.
            </div>
          )}
          {isSignUp && (
            <div className="forgot-container" onClick={() => setIsSignUp(!isSignUp)}>
              Already have an account? Click here to login.
            </div>
          )}
          {!isSignUp && (
            <div className="forgot-container" onClick={() => console.log('Forgot password clicked')}>
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

      {user && <div>Hi {user.name}, welcome back!</div>}
    </div>
  );
};

export default LoginSignup;
