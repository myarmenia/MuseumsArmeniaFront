import React, { useEffect } from 'react';
import './SingleShop.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDataShop } from '../../store/slices/Shop/ShopApi';
import { getSingleShopDatas } from '../../store/slices/Shop/ShopSlice';

function SingleShop() {
  const params = useParams();
  const dispatch = useDispatch();
  const SingleShopDatas = useSelector(getSingleShopDatas);

  useEffect(() => {
    dispatch(getSingleDataShop(params.id));
  }, []);

  console.log('SingleShopDatas', SingleShopDatas);
  return (
    <>
      <div className="singleShop_All">{SingleShopDatas.name}</div>
    </>
  );
}

export default SingleShop;
