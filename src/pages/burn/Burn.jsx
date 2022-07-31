import React, { useEffect, useState } from "react";
import axios from "axios";
import { MINTKART_CONTRACT_ADDRESS } from "../../constant";
import { useSnackbar } from 'notistack';
import { BackdropLoader } from '../../components';

const now = new Date(Date.now());

const Burn = () => {

  const { enqueueSnackbar } = useSnackbar();
  
  const [burnIds, setBurnIds] = useState([]);
  const [burnLoading, setBurnLoading] = useState(false);

  useEffect(() => {
    const fetchAllWarranties = async () => {
      setBurnIds([])
      try {
          const response = await axios.get(`https://api.jakartanet.tzkt.io/v1/contracts/${MINTKART_CONTRACT_ADDRESS}/storage`);
          const id = response.data.warranties;
          const { data } = await axios.get(`https://api.jakartanet.tzkt.io/v1/bigmaps/${id}/keys/`);

          let burnNFTKeys = []            
          for(let i = 0; i < data.length; i++) {
            const obj = data[i];
            if(obj.value.burntOn !== "1970-01-01T00:00:00Z") continue;

            const claimedOn = new Date(obj.value.claimedOn);
            const warranty = obj.value.warranty;            
            const expiredOn = new Date(claimedOn.getTime() + warranty*1000);

            if(expiredOn < now) {
              burnNFTKeys.push(obj.key);
            }
          }
          setBurnIds(burnNFTKeys);
        } catch(e) {
          console.log(e);
        }
    }
    fetchAllWarranties();   
    return () => {};
  }, [])


  const handleBurn = async () => {
    setBurnLoading(true);
    try {
      const id = burnIds[0];
      const { data } = await axios.get(`/api/v1/burn-nft/${id}`);
      if(data.success) {
        enqueueSnackbar("NFTs have been burned successfully", { variant: "success" });
        let burnNFTKeys = burnIds;
        burnNFTKeys.shift();
        setBurnIds(burnNFTKeys);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }        
    setBurnLoading(false);
  }

  return (
    <>
    {burnLoading && <BackdropLoader />}
    <div className='create create_section__padding'>
      <div className="create-container">
        <h1 className="create-container-title">Burn NFTs</h1>
        <div className='add-item-box'>
          Total NFTs to burn today: {burnIds.length}
        </div>
        {burnIds.map((id, i) => (
          <React.Fragment key={i}>
          <div className="px-4 py-4 flex items-center text-sm">
            <p className="text-neutral-400 w-2/4">NFT Id</p>
            <p className="flex-1 pr-1">{id}</p>
          </div>
          <hr/>
          </React.Fragment>
        ))}
        <button className='mint-button' onClick={handleBurn}>Burn NFTs</button>
      </div>
    </div>   
    </>
  )
};



export default Burn;
