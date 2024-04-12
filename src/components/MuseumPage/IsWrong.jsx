import React from 'react';

const IsWrong = ({ text }) => {
   return (
      <div
         style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}>
         <h3>{text}</h3>
      </div>
   );
};

export default IsWrong;
