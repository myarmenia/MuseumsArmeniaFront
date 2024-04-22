import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { Outlet, useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';

function ProfilePage() {
  const navigate = useNavigate();
  const lang = localStorage.getItem('lang');

  useEffect(() => {
    // Redirect to the MyAccount page when ProfilePage is accessed
    // window.location.pathname = `${lang}/profilePage/myaccount`;
    navigate(`/${lang}/profilePage/myaccount`);
  }, []);
  // useEffect(() => {
  //   navigate({ replace: true });
  // }, []);

  return (
    <div className="ProfilePage_all">
        <div className="ProfilePage_bigDiv">
          <ProfileSidebar />
          <div className='ProfilePage_bigDiv_right'>
            <Outlet />
          </div>
      </div>
    </div>
  );
}

export default ProfilePage;
