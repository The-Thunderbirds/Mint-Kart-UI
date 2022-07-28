import React, {useState, useEffect} from "react";
import "./warranty.css";

const Warranty = () => {
  
  const [serialNum, setSerialNum] = useState('');
  const [userWallet, setUserWallet] = useState('');

  return (
    <div className='create create_section__padding'>
      <div className="create-container">
        <h1 className="create-container-title">Check Product's Warranty</h1>
        <div className='add-item-box'>
            <input value={serialNum} onChange={(e) => setSerialNum(e.target.value)} 
            className='add-item-input' placeholder='Product serial number...' autoFocus/>
        </div>
        <div className='add-item-box'>
            <input value={userWallet} onChange={(e) => setUserWallet(e.target.value)} 
            className='add-item-input' placeholder='User wallet address...'/>
        </div>
        <button className='mint-button'>Check</button>
        </div>
    </div>   
  )
};

export default Warranty;