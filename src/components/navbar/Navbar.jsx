import React,{ useState} from 'react'
import './navbar.css'
import { Tooltip } from '@mui/material';
import { RiWallet3Line } from 'react-icons/ri';
import logo from '../../assets/firedrop.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [reqLoad, setReqLoad] = useState(false);

  const updateBalance = async () => {
    const address = user.public_key_hash;
    const { data } = await axios.get(`https://api.jakartanet.tzkt.io/v1/accounts/${address}/balance`);
    setBalance(data / 10**6);
  }

  const handleClose = () => {setShow(false);}  
  const handleShow = () => {
    updateBalance();
    setShow(true);
  }

  const requestTz = async () => {
    setReqLoad(true);
    const { data } = await axios.get(`/api/v1/request-xtz`);
    if(data.success) {
      setReqLoad(false);
      handleClose();
      enqueueSnackbar("Request for ꜩ has been sent successfully", { variant: "success" });
      setTimeout(()=>{
        enqueueSnackbar("Please have patience. It takes few second to process ꜩ request. Thanks", { variant: "success" });
      }, 1000);
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logged out Successfully", { variant: "success" });
    navigate("/login");
  }

  const Menu = () => (  
    <>
      <Link to="/"><p>Explore</p> </Link>
      {isAuthenticated && user.role === "seller" && <p>My Items</p>}
      {isAuthenticated && user.role === "customer-service" && <Link to="/burn-nfts"><p>Burn NFTs</p></Link>}
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
    </div>

    {/* Balance and Request ꜩ*/}
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header>
      <Modal.Title>Balance: {balance} ꜩ</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={requestTz}>
        Request for ꜩ 
      </Button>
      {reqLoad && <CircularProgress size={25}/>}
    </Modal.Footer>
    </Modal>
  </>
  )
}

export default Navbar
