import React, { useEffect, useState } from 'react';
import './item.css'
import item from '../../assets/item1.png'
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, } from '../../actions/productActions';
import { Loader, PreviousBtn, NextBtn } from '../../components';


const Item = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  const productId = params.id;

  useEffect(() => {
    if(error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
      return;
    }
    dispatch(getProductDetails(productId));
    // eslint-disable-next-line
  }, [dispatch, productId, error, enqueueSnackbar]);

  return( 
    <>
      {loading ? <Loader /> :
      product === undefined ? <div className="not-exists"><h1>Product doesn't exist</h1></div> :
      product[0] === undefined ? <div className="not-exists"><h1>Product doesn't exist</h1></div> :
      (
        <>
        <div className='item section__padding'>
          <div className="item-image">
            <img src={product[0].images[0].url} alt="item" />
          </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{product[0].name}</h1>
            </div>
            <div className="item-content-detail">
              <p>{product[0].description}</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn">Price ₹{product[0].price}</button>
            </div>
          </div>
        </div>
        </>
      )
      }
    </>
  )
};

export default Item;
