import React, {useState, useRef} from "react";
import "./warranty.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Warranty = () => {
  
  const myRef = useRef(null)

  const [serialNum, setSerialNum] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [hasClickedCheck, setHasClickedCheck] = useState(false);
  const [hasNFT, setHasNFT] = useState(false);
  const [inWarranty, setInWarranty] = useState(false);
  const [currSNum, setCurrSNum] = useState('');
  const [newSNum, setNewSNum] = useState('');
  const [date, setDate] = useState('');  

  const handleCheckClick = () => {
    setHasClickedCheck(true);
    setHasNFT(true);
    myRef.current.scrollIntoView();
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addHistory = () => {

  }

  return (
    <>
    <div className='create create_section__padding'>
      <div className="create-container">
        <h1 className="create-container-title">Check Product's Warranty</h1>
        <div className='add-item-box'>
            <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} 
            className='add-item-input' placeholder='User email address...' autoFocus/>
        </div>
        <div className='add-item-box'>
            <input value={serialNum} onChange={(e) => setSerialNum(e.target.value)} 
            className='add-item-input' placeholder='Product serial number...'/>
        </div>
        <button className='mint-button' onClick={handleCheckClick}>Check</button>
      </div>
    </div>   

    <main className="mt-12 sm:mt-0" ref={myRef}>
      {hasClickedCheck && !hasNFT? <div className="not-exists"><h1>NFT does not exist</h1></div> : 
      hasClickedCheck && hasNFT? (
        <>
        {/* <!-- product image & description container --> */}
        <div className="w-full flex flex-col sm:flex-row sm:p-2 relative text-white">

            {/* <!-- image wrapper --> */}
            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen p-3">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                    <div className="w-full h-full pb-6 border-[#a5a5a5]/[.1] relative">
                        <img draggable="false" className="w-full h-96 object-contain" 
                        src="https://res.cloudinary.com/dgrr4aftk/image/upload/v1658843834/products/v6t5zwancyl1gqpjgprg.webp" alt={"Product image"}/>
                    </div>
                </div>
                {/* <!-- imgbox --> */}
            </div>
            {/* <!-- image wrapper --> */}

            {/* <!-- product desc wrapper --> */}
            <div className="flex-1 py-2 px-3">

                {/* <!-- whole product description --> */}
                <div className="flex flex-col gap-2 mb-4">

                    <h2 className="text-xl">{"product[0].name"}</h2>
                    {inWarranty ? 
                    <h3 className="text-m text-green-400">{"In Warranty"}</h3> :
                    <h3 className="text-m text-rose-600">{"Out of Warranty"}</h3> 
                    }
                  {/* <!-- warranty & brand --> */}
                    <div className="flex gap-8 mt-2 items-center text-sm">
                        <img draggable="false" className="w-20 h-8 p-0.5 object-contain" 
                        src={"https://res.cloudinary.com/dgrr4aftk/image/upload/v1658843836/brands/pv2ltml2ggohciedcw6j.jpg"} alt={"product[0].brand && product[0].brand.name"} />
                        <span>{"product[0].warranty"} Year Warranty </span>
                    </div>
                    {/* <!-- warranty & brand --> */}

                    {/* <!-- purchase details --> */}
                    <div className="flex flex-col sm:flex-row justify-between">
                        {/* <!-- highlights details --> */}
                        <div className="flex gap-16 mt-4 items-stretch text-sm">
                            <p className="text-neutral-400 font-medium">Purchase Details</p>

                            <ul className="list-disc flex flex-col gap-2 w-64">
                              <li>
                                <p>{"Purchased on: "}
                                <span>{"5 July 2022"}</span>
                                </p>
                              </li>
                              <li>
                                <p>{"Warranty left: "}
                                <span>{"10 days"}</span>
                                </p>
                              </li>
                            </ul>
                        </div>
                        {/* <!-- purchase details --> */}

                    </div>
                    {/* <!-- highlights & services details --> */}

                    {/* <!-- specifications border box --> */}
                    <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                        <h1 className="px-6 py-4 border-b text-2xl font-medium">History
                        <FontAwesomeIcon className="float-right cursor-pointer" icon={faPlus} 
                        onClick={handleShow}/>
                        </h1>

                        {/* <!-- specs list --> */}
                        {/* {product[0].specifications?.map((spec, i) => (
                          <div className="px-4 py-4 flex items-center text-sm">
                              <p className="text-neutral-400 w-2/12">Old Serial Number</p>
                              <p className="flex-1">{"old serial num"}</p>
                              <p className="text-neutral-400 w-2/12">New Serial Number</p>
                              <p className="flex-1">{"new serial num"}</p>
                              <p className="text-neutral-400 w-2/12">Date</p>
                              <p className="flex-1">{"Date"}</p>
                          </div>
                          <hr/>
                        ))} */}
                        {/* <!-- specs list --> */}

                    </div>
                    {/* <!-- specifications border box --> */}
                </div>

            </div>
            {/* <!-- product desc wrapper --> */}
        </div>
        {/* <!-- product image & description container --> */}
        </>
        ) : (<div></div>)
      }
    </main>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Add Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Serial Number</Form.Label>
            <Form.Control
              value={currSNum} onChange={(e) => setCurrSNum(e.target.value)}
            />
            <Form.Label className="mt-2">New Serial Number</Form.Label>
            <Form.Control
              value={newSNum} onChange={(e) => setNewSNum(e.target.value)}
            />
            <Form.Label className="mt-2">Date</Form.Label>
            <Form.Control
              value={date} onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addHistory}>
          Change product
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
};

export default Warranty;