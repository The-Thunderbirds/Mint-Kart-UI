import React, { useState, useEffect } from 'react';
import './login.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/')
    }
}, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)
    try {
      const config = {
          headers: {
              "Content-Type": "application/json",
          },
      }
      const { data } = await axios.post(
          '/api/v1/login',
          { email, password },
          config
      );
      console.log(data);
      alert("Succesfully logged in");
      navigate("/create");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
        <form className='login-writeForm' autoComplete='off'>
        <div className="login-formGroup">
            <label>Email</label>
            <input type="email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-formGroup">
            <label>Password</label>
            <input type="password" required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
         <div className="login-button">
          <Link to="/register">
            <button className='login-reg-writeButton'>register</button>
          </Link>
          <button className='login-writeButton' onClick={handleSubmit}>login</button>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Login;
