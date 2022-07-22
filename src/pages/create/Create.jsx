import React, {useState, useEffect} from "react";
import './create.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Create = () => {

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

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

  const handleAddButtonClick = () => {
    console.log(inputValue)
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
	};

  return (
    <div className='create section__padding'>
      <div className="create-container">
        <h1>Mint Warranty NFTs</h1>
        <div className='add-item-box'>
					<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
          className='add-item-input' placeholder='Add product serial number...' />
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
        <button className='mint-button'>Mint all Items</button>
      </div>
    </div>
   
  )
};

export default Create;
