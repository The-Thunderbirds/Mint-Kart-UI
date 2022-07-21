import React, {useState} from 'react';
import './register.css'
import {Link} from 'react-router-dom'
import Image from '../../assets/Image.png'

const Register = () => {

  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(avatar);
    console.log(name, email, password, gender)
  }

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>Register</h1>
        <form className='register-writeForm' autoComplete="off">
          <div className="register-formGroup">
            <label>Upload Profile Picture</label>
            <input 
              type="file" 
              className='custom-file-input'
              onChange={(event) => setAvatar(event.target.files[0] || null)} 
            />
          </div>
          <p className='upload-file' style={{"marginBottom": "10px"}}>Profile picture</p>
          <div className="upload-img-show">
            <img src={avatar===''? Image: URL.createObjectURL(avatar)} alt="avatar"/>     
          </div>
          <div className="register-formGroup">
            <label>Full Name</label>
            <input type="text" required
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="register-formGroup">
            <label>Email</label>
            <input type="email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-formGroup">
            <label>Password</label>
            <input type="password" required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="register-formGroup">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>          
          </div>
         <div className="register-button">
          <Link to="/login">
            <button className='reg-login-writeButton'>login</button>
          </Link>
          <button className='register-writeButton' onClick={handleSubmit}>register</button>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Register;
