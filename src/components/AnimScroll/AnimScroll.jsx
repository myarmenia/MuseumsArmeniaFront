import React, { useState, useEffect, useRef, useCallback } from 'react';
import Bigtext from './Bigtext';
import ParentBlock, { dataMuseum } from './homblock/ParentBlock';

import './animscrol.css';
import { logDOM } from '@testing-library/react';

const AnimScroll = () => {
   const [animParentText, setAnimParentText] = useState(400);
   const [animTopText, setTopText] = useState(-115);
   const [animBootomText, setBootomText] = useState(70);

   const [animParentBlock, setParentBlock] = useState(1000);
   const [odd, setodd] = useState(190);
   const [even, setEven] = useState(-290);

   const [stopLeft, setStopLeft] = useState(true);
   const [stopRigth, setStopRigth] = useState(true);
   const [startAnimation, setStartAnimation] = useState(false);
   const [windowScol, setWindowScol] = useState(false);

   const scrollRef = useRef(null);

   const dataLength = +(dataMuseum.length * 300);
   useEffect(() => {
      setStopLeft(animParentText >= 300);
      setStopRigth(animParentBlock >= -dataLength);
   }, [animParentText]);

   useEffect(() => {
      if (startAnimation && windowScol) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'visible';
      }
   }, [startAnimation, windowScol]);

   // const scrolling = useCallback(() => {
   //   const rect = scrollRef.current?.getBoundingClientRect()?.top;
   //   if (rect > -50 && rect < 150) {
   //     setWindowScol(true);
   //   } else {
   //     setWindowScol(false);
   //   }
   // });
   // useEffect(() => {
   //   window.addEventListener('scroll', scrolling);

   //   return () => window.removeEventListener('scroll', scrolling);
   // }, []);

   useEffect(() => {
      function handleScroll() {
         const divRect = scrollRef.current.getBoundingClientRect();
         const windowHeight = window.innerHeight;
         const divCenterY = divRect.top + divRect.height / 2;
      

         if (divCenterY > 360 && divCenterY < 420) {
            // Вызываем вашу функцию здесь
            setWindowScol(true);
            // console.log('Div в центре экрана');
         } else {
            setWindowScol(false);
            document.body.style.overflow = 'visible';
         }
      }

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const handleWheel = (event) => {
      // console.log(windowScol, 'windowScol');
      if (windowScol) {
         if (event.deltaY > 0) {
            if (stopRigth) {
               setAnimParentText((prev) => prev - 10);
               setTopText((prev) => prev - 3);
               setBootomText((prev) => prev + 4);
               setParentBlock((prev) => prev - 10);
               setEven((prev) => prev + 2, 8);
               setodd((prev) => prev - 2);
               setStartAnimation(true);
            } else {
               setStartAnimation(false);
            }
         } else if (event.deltaY < 0) {
            if (!stopLeft) {
               setAnimParentText((prev) => prev + 10);
               setTopText((prev) => prev + 3);
               setBootomText((prev) => prev - 4);

               setParentBlock((prev) => prev + 10);
               setEven((prev) => prev - 2, 8);
               setodd((prev) => prev + 2);
               setStartAnimation(true);
            } else {
               setStartAnimation(false);
            }
         }
      }
   };

   return (
      <div className="scrollAnim">
         {/* <div className="header"></div> */}

         <div className="">
            <div
               ref={scrollRef}
               onWheel={handleWheel}
               className="animBlock"
               style={{ overflow: 'hidden' }}>
               <div
                  className="animBlock_parent"
                  // onMouseOver={() => setStartAnimation(true)}
                  // onMouseLeave={() => setStartAnimation(false)}
               >
                  <Bigtext
                     animParentText={animParentText}
                     animTopText={animTopText}
                     animBootomText={animBootomText}
                     scrollRef={scrollRef}
                  />
                  <ParentBlock animParentBlock={animParentBlock} odd={odd} even={even} />
               </div>
            </div>
         </div>
         {/* <div className="footer"></div> */}
      </div>
   );
};

export default AnimScroll;
