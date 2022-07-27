import React, {useState, useEffect} from "react";
import './create.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

const Create = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user, loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [items, setItems] = useState([]);
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


  const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
	};

  const handleMint = () => {
    const email = user.email;

    // TODO: axios post request
  }

  return (
    <div className='create section__padding'>
      <div className="create-container">
        <h1>Mint Warranty NFTs</h1>
        <div className='add-item-box'>
					<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
          className='add-item-input' placeholder='Add product serial number...' autoFocus/>
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
				</div>
        <div className='item-list'>
          {items.map((item, index) => (
            <div className='item-container'>
              <div className='item-name'>
                <span>{item.itemName}</span>
              </div>
            </div>
          ))}
        </div>
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

export default Create;
