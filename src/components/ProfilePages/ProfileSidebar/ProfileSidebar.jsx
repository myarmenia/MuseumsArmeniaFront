import React, { useState } from 'react';
import './ProfileSidebar.css';
import { ProfileSidebarArrll } from '../../../helper/ProfileSidebarHelp/ProfileSidebarHelp';
import { NavLink, useNavigate } from 'react-router-dom';

function ProfileSidebar() {
  const ProfileSidebarArr = ProfileSidebarArrll();
  const navigate = useNavigate();

  return (
    <div className="ProfileSidebar_all">
      <div className="ProfileSidebar_bigDiv">
        {ProfileSidebarArr.map((el, index) => (
          <div key={index} className="profileSIdebar_divs">
            <NavLink
              className={({ isActive }) => (isActive ? 'line_div  line_divActive' : 'line_div')}
              to={el.slug}>
              <span className='line_div_profile_icon'>{el.icon}</span>
              <span>{el.name}</span>
            </NavLink>
          </div>  
        ))}
      </div>
    </div>
  );
}

export default ProfileSidebar;
