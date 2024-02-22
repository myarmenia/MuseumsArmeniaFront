import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, getIsAuth } from '../store/slices/Auth/AuthSlice';
import { getCurrentUser } from '../store/slices/Auth/AuthApi';
import './PrivateRoute.css'
import { Navigate } from 'react-router-dom';

const PrivateRouteForRegAndLog = ({ children }) => {
    const lang = localStorage.getItem('lang');
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const authUser = useSelector(getAuthUser);
    const [loading, setLoading] = useState(true);
    const sesionIsAuth  = sessionStorage.getItem('isAuth')
    const token  = sessionStorage.getItem('token')

    useEffect(() => {
      const fetchData = async () => {
        if (sesionIsAuth && token) {
          await dispatch(getCurrentUser());
        }
        setLoading(false); 
      };
      fetchData();
    }, []);
  
    if (loading) {
      return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    }
    
    return !isAuth ? children : <Navigate to={`/${lang}/profilePage/dashboard`} />;

  //  if (sesionIsAuth) {
  //   return <Navigate to={`/${lang}/profilePage/dashboard`}/>
  //  }
  //  else{
  //   return children
  //  }
  };
  

export default PrivateRouteForRegAndLog;