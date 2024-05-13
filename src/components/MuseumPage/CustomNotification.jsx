import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationStatus } from '../../store/slices/MuseumPagesSlice/MuseumPagesSlice';

import { CrossIcon, CheckMarkIcon } from '../../iconFolder/icon';

const CustomNotification = () => {
   const { notificationStatus } = useSelector((state) => state.museumPages);
   const dispatch = useDispatch();
   React.useEffect(() => {
      setTimeout(() => {
         dispatch(setNotificationStatus(null));
      }, 8000);
   }, []);
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
