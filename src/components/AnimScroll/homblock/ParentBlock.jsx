import React from 'react';
import MinBlock from './MinBlock';

import images from '../../../images/pexels-photo-2602545.jpeg';
export const dataMuseum = [
   {
      id: 1,
      title: 'MBC EGYPTS UMM KULTHUM',
      img: images,
      name: 'VIEW PROJECT',
      number: '01',
   },
   {
      id: 2,
      title: 'MBC EGYPTS UMM KULTHUM',
      img: images,
      name: 'VIEW PROJECT',
      number: '01',
   },
   {
      id: 3,
      title: 'MBC EGYPTS UMM KULTHUM',
      img: images,
      name: 'VIEW PROJECT',
      number: '01',
   },
   {
      id: 4,
      title: 'MBC EGYPTS UMM KULTHUM',
      img: images,
      name: 'VIEW PROJECT',
      number: '01',
   },
   {
      id: 5,
      title: 'MBC EGYPTS UMM KULTHUM',
      img: images,
      name: 'VIEW PROJECT',
      number: '01',
   },
];

const ParentBlock = ({ animParentBlock, odd, even }) => {
   return (
      <div
         className="parr_minBlock"
         style={{
            position: 'absolute',
            left: `${animParentBlock}px`,
            display: 'flex',
            // gap: '50px',
            transition: '0.1s',
         }}>
         <div
            style={{
               display: 'flex',
               // gap: '30px',
               transition: '0.1s',
               position: 'absolute',
               top: '-160px',
            }}>
            {dataMuseum.map((item) => (
               <MinBlock key={item.id} {...item} odd={odd} even={even} />
            ))}
         </div>
      </div>
   );
};

export default ParentBlock;
