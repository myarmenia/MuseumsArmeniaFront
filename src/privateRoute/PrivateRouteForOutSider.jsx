import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, getIsAuth } from '../store/slices/Auth/AuthSlice';
import { getCurrentUser } from '../store/slices/Auth/AuthApi';
import './PrivateRoute.css'

const PrivateRouteForOutSider = ({ children }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const [loading, setLoading] = useState(true);
    const sesionIsAuth  = sessionStorage.getItem('isAuth')
 
    console.log(isAuth, sesionIsAuth, 999999999999999999999999999)
    useEffect(() => {
      const fetchData = async () => {
        if (!isAuth && sesionIsAuth) {
          await dispatch(getCurrentUser());
        }
        setLoading(false); 
      };
      fetchData();



    }, [dispatch, isAuth]);
  
    if (loading) {
      return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    }

    return children;
  };
  

export default PrivateRouteForOutSider;