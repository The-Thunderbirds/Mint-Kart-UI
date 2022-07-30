import React, {useState, useEffect} from 'react';
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../../assets/Image.png'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userActions';
import { BackdropLoader } from '../../components';
import { useSnackbar } from 'notistack';

const Register = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [role, setRole] = useState('seller');

  useEffect(() => {
    if(error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if(isAuthenticated) {
      navigate('/')
    }
  }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

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

    if(password.length < 8) {
      enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
      return;
    }    
    if(phone.length !== 10) {
      enqueueSnackbar("Phone number is invalid", { variant: "warning" });
      return;
    }    
    if(avatar === "") {
      enqueueSnackbar("Please upload your profile picture", { variant: "warning" });
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("mobile_number", phone);
    formData.set("gender", gender);
    formData.set("password", password);
    formData.set("avatar", avatar);
    formData.set("role", role);

    dispatch(registerUser(formData));
  }

  return (
    <>
    {loading && <BackdropLoader />}
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
            <label>Password</label>
            <input type="password" required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="seller">Seller</option>
              <option value="customer-service">Customer Service</option>
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
    </>
   )
};

export default Register;
