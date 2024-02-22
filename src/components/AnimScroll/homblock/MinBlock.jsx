import React from 'react';
import '../MinBlock.css'

const MinBlock = ({ id, title, img, name, number, odd, even }) => {
   return (
      <div
         className="testtt"
         style={{
            position: 'absolute',
            top: id % 2 === 1 ? `${odd }px` : `${even}px`,
            right: id > 0 ? `-${id * 400}px` : '',
         }}>
         {/* <div className="minBlock_header">
            <p className="number">{number}</p>
            <p className="title">{title}</p>
         </div> */}
            <div className='testt_img_div'>
               <img src={img} alt="img" />
               <div className='testt_img_div_info_div'>
                  <span>{name}</span>
                  <span>{number}</span>
               </div>
         </div>
      </div>
   );
};

export default MinBlock;
