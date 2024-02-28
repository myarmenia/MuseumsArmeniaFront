import React from 'react';
import { Outlet } from 'react-router-dom';

const MuseumLayouts = () => {
   return (
      <div className="">
         <Outlet />
      </div>
   );
};

export default MuseumLayouts;
