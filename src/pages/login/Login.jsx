import React, {useState} from 'react';
import './login.css'
import {Link} from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
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
