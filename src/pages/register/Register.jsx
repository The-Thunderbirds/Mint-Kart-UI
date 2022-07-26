import React, {useState, useEffect} from 'react';
import './register.css'
import {Link, useNavigate} from 'react-router-dom'
import Image from '../../assets/Image.png'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/userActions';

const Register = () => {
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [isSeller, setIsSeller] = useState('true');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate]);

  const handleAvatarChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatar(reader.result);
        }
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("mobile_number", phone);
    formData.set("gender", gender);
    formData.set("password", password);
    formData.set("avatar", avatar);
    // formData.set("isSeller", isSeller);

    // console.log(name, email, password, gender, isSeller)

    dispatch(registerUser(formData));
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
              accept="image/*" 
              className='custom-file-input'
              onChange={handleAvatarChange} 
            />
          </div>
          <p className='upload-file' style={{"marginBottom": "10px"}}>Profile picture</p>
          <div className="upload-img-show">
            <img src={avatar===''? Image: avatar} alt="avatar"/>     
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
            <label>Phone Number</label>
            <input type="tel" required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <div className="register-formGroup">
            <label>What represents you?</label>
            <select
              value={isSeller}
              onChange={(e) => setIsSeller(e.target.value)}
            >
              <option value="true">Seller</option>
              <option value="false">Customer Service</option>
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
