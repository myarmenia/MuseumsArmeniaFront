import React from 'react';
import { useSelector } from 'react-redux';

import { CrossIcon, CheckMarkIcon } from '../../iconFolder/icon';

const CustomNotification = () => {
   const { notificationStatus } = useSelector((state) => state.museumPages);
   return (
      <div
         className="CustomNotification-par"
         style={{
            opacity: notificationStatus?.open ? '1' : '0',
            transform: notificationStatus?.open ? 'translateX(-14px)' : 'translateX(400px)',
         }}>
         <div
            style={{ backgroundColor: notificationStatus?.species ? '#58C34D' : '#ED5756' }}
            className="CustomNotification-block_left"></div>
         <div className="CustomNotification-block_right">
            {notificationStatus?.species ? <CheckMarkIcon /> : <CrossIcon />}
            <p>{notificationStatus?.messages}</p>
         </div>
      </div>
   );
};

export default React.memo(CustomNotification);
