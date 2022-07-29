import React,{ useState} from 'react'
import './navbar.css'
import { Tooltip } from '@mui/material';
import { RiMenu3Line, RiCloseLine, RiWallet3Line } from 'react-icons/ri';
import logo from '../../assets/firedrop.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [toggleMenu,setToggleMenu] = useState(false)

  const { user, loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleClose = () => {setShow(false);}
  const handleShow = async () => {

    const address = user.public_key_hash;
    // const address = "tz1TpvrMd352n7LZgb3TAd1kE4XZvTLS5EvR";
    const { data } = await axios.get(
      `https://api.jakartanet.tzkt.io/v1/accounts/${address}/balance`
    );
    setBalance(data / 10**6);
    setShow(true);
  }

  const requestTz = async () => {
    const { data } = await axios.get(
      `/api/v1/request-xtz`
    );
    console.log("Request for tz");
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logged out Successfully", { variant: "success" });
    navigate("/login");
  }

  const Menu = () => (  
    <>
      <Link to="/"><p>Explore</p> </Link>
      {isAuthenticated && <p>My Items</p>}
    </>
   )
  
  return (
    <>
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo"/>
          <Link to="/"> 
            <h1>MintKart</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder='Search Item Here' autoFocus={true} />
         <Menu/>
         {isAuthenticated && <Link to="/"><p onClick={handleLogout}>Logout</p></Link> }
        
        </div>
      </div>
      <div className="navbar-sign">
      {isAuthenticated ? (
        <>
          {
            user.role === "seller" &&
            <Link to="/mint"> 
              <button type='button' className='primary-btn'>Mint NFTs</button>
            </Link>
          }
          {
            user.role === "customer-service" &&
            <Link to="/check-warranty"> 
              <button type='button' className='primary-btn'>Check Warranty</button>
            </Link> 
          }
          <Tooltip title={user.public_key_hash}>
          <button type='button' className='secondary-btn' onClick={handleShow}>
            <RiWallet3Line color="#2874f0" size={27} style={{"display": "initial"}}/> {user.public_key_hash.substr(0, 7) + "..."} 
          </button>                    
          </Tooltip>
        </>
      ): (
        <>
        <Link to="/login"> 
         <button type='button' className='primary-btn' >Sign In</button>
        </Link>
        <Link to="/register"> 
          <button type='button' className='secondary-btn'>Sign Up</button>
        </Link>
        </>
      )}
       

       
      </div>
      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
             <Menu/>
            </div>
            <div className="navbar-menu_container-links-sign">
            {user ? (
              <>
              <Link to="/mint"> 
                <button type='button' className='primary-btn' >Mint NFTs</button>
              </Link>
              <button type='button' className='secondary-btn'>Connect</button>
              </>
            ): (
              <>
              <Link to="/login"> 
              <button type='button' className='primary-btn'>Sign In</button>
              </Link>
              <Link to="/register"> 
                <button type='button' className='secondary-btn'>Sign Up</button>
              </Link>
              </>
            )}
           
            </div>
            </div>
        )}
      </div>
    </div>
      <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Balance: {balance} tz</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={requestTz}>
          Request for xtz
        </Button>
      </Modal.Footer>
      </Modal>
  </>
  )
}

export default Navbar
