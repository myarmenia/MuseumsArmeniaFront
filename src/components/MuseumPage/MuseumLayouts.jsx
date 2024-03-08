import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MuseumLayouts = () => {
   return (
      <div>
         <Outlet />
      </div>
   );
};

export default memo(MuseumLayouts);
