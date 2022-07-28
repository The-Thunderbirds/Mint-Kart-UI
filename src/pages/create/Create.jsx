import React, {useState, useEffect} from "react";
import './create.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSnackbar } from 'notistack';
import axios from "axios";
import { Link } from 'react-router-dom';
import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../../components';

const Create = () => {

  const { enqueueSnackbar } = useSnackbar();
  
  const [serialNums, setSerialNums] = useState([]);
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');

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
  }, [inputValue]);  

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPassword('');
  }

  const handleShow = () => setShow(true);

  const handleAddButtonClick = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/serial/${inputValue}`);

      // Checking for duplicate serial numbers
      // for(let i = 0; i < serialNums.length; i++) { 
      //   if(serialNums[i] === inputValue) {
      //     enqueueSnackbar("Product with given serial number already exists", { variant: "error" });
      //     return;
      //     }
      // }

      const newSerialNums =  [...serialNums, inputValue];
      const newProducts = [...products, data.product];
      setSerialNums(newSerialNums);
      setProducts(newProducts);
      setInputValue('');
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      return;
    }    
	};

  const handleMint = async () => {
    
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

    console.log(data);
  }

  return (
    <div className='create create_section__padding'>
      <div className="create-container">
        <h1 className="create-container-title">Mint Warranty NFTs</h1>
        <div className='add-item-box'>
					<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
          className='add-item-input' placeholder='Add product serial number...' autoFocus/>
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
				</div>
        {products.length !== 0 && (
        <section className="w-full shadow overflow-hidden">
            <div className="flex px-6 py-4 justify-between items-center">
                <h1 className="text-xl font-medium">Minting Queue</h1>
            </div>            
            <hr />
            {/* <!-- header --> */}
            <Slider {...settings}>
                {products.map((item, i) => (
                    <Product {...item[0]} key={i} />
                ))}
            </Slider>
        </section>
        )}

        {/* <div className='item-list'>
          {products.map(product => (
            <div key={product[0].serialNumber} className='item-container'>
              {console.log(product[0])}
              <div className='item-name'>
                <a target="_blank" href={`/post/${product[0].serialNumber}`}>
                  <span>{product[0].serialNumber}</span>
                </a>
              </div>
            </div>
          ))}
        </div> */}
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
