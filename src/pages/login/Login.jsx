import React, { useState, useEffect } from 'react';
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userActions';
import { BackdropLoader } from '../../components';
import { useSnackbar } from 'notistack';

const Login = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if(isAuthenticated) {
      navigate('/')
    }
  }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  return (
    <>
    {loading && <BackdropLoader />}
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
          <button className='login-writeButton' onClick={handleLogin}>login</button>
         </div>
        </form>
      </div>
    </div>
    </>
   )
};

export default Login;
