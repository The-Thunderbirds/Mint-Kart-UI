import React, {useState, useEffect} from "react";
import './create.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSnackbar } from 'notistack';
import axios from "axios";
import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../../components';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const Create = () => {

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  const [serialNums, setSerialNums] = useState([]);
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAddButtonClick();
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line
  }, [inputValue]);  

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPassword('');
  }

  const handleShow = () => setShow(true);

  const handleAddButtonClick = async () => {
    setAddLoading(true);
    const spacesepInput = inputValue.split(" ");
    for(let i = 0; i < spacesepInput.length; i++) { 
      const id = spacesepInput[i];
      try {
        const { data } = await axios.get(`/api/v1/product/serial/${id}`);
  
        // Checking for duplicate serial numbers (not working properly)
        // const hasDuplicate = false;
        // for(let j = 0; j < serialNums.length; j++) { 
        //   if(serialNums[j] === id) {
        //      enqueueSnackbar(`Product with given serial number ${id.substr(0, 10)}... already exists`, { variant: "error" });
        //      hasDuplicate = true;
        //     //  break;
        //   }
        // }
        // if(hasDuplicate) continue;
  
        const newSerialNums = serialNums;
        newSerialNums.push(id);
        setSerialNums([...newSerialNums]);

        const newProducts = products;
        newProducts.push(data.product);
        setProducts([...newProducts]);
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }    
    }
    setInputValue('');
    setAddLoading(false);
	};

  const handleMint = async () => {
    setMintLoading(true);
    try {
      const config = {
        headers: {
            "Content-Type": "application/json",
        },
      }
      const { data } = await axios.post(
        '/api/v1/batch-mint',
        {serialNums, password},
        config
      );
      setMintLoading(false);
      handleClose();
      if(data.success) {
        enqueueSnackbar("NFTs have been minted successfully", { variant: "success" });
        navigate('/');
      }
    } catch (error) {
      setMintLoading(false);
      handleClose();
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  }

  return (
    <div className='create create_section__padding'>
      <div className="create-container">
        <h1 className="create-container-title">Mint Warranty NFTs</h1>
        <div className='add-item-box'>
					<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
          className='add-item-input' placeholder='Add product serial number... [Separated by spaces]' autoFocus/>
          {addLoading ? 
            <CircularProgress size={25}/> :
            <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
          }     
				</div>
        {products.length !== 0 && (
        <section className="w-full shadow overflow-hidden">
            <div className="flex px-6 py-4 justify-between items-center">
                <h1 className="text-xl font-medium">Minting Queue</h1>
            </div>            
            <hr />
            <Slider {...settings}>
                {products.map((item, i) => (
                    <Product {...item[0]} key={i} />
                ))}
            </Slider>
        </section>
        )}
        <button className='mint-button' onClick={handleShow}>Mint all Items</button>
      </div>
      <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Enter your password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              autoFocus
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleMint}>
          Confirm
        </Button>
        {mintLoading && <CircularProgress size={25}/>}
      </Modal.Footer>
      </Modal>
    </div>   
  )
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 1,
  swipe: false,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
};

export default Create;
