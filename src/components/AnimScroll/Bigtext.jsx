import React from 'react';
import { AnimArowTop, AnimArrowBottom} from '../../iconFolder/icon';
import '../AnimScroll/BigText.css'

const Bigtext = ({ animParentText, animTopText, animBootomText, scrollRef}) => {
   const handleScrollTop = () => {
      document.body.style.overflow = 'visible';
       window.scrollTo({
         top: scrollRef.current.offsetTop -800,
         left: 100,
         behavior: "smooth",
       });
   }

   const handleScrollBottom = () => {
      document.body.style.overflow = 'visible';
       window.scrollTo({
         top: scrollRef.current.offsetTop + 800,
         left: 100,
         behavior: "smooth",
       });
   }

   return (
      <div
         className="big_text"
         style={{
            position: 'absolute',
            left: `${animParentText}px`,
            transition: '0.1s',
         }}>
         <div className="parent_bigtext" style={{ position: 'relative'}}>
            <div
            id='partext1'
               className="partext1"
               style={{
                  position: 'absolute',
                  top: `${animTopText}px`,
                  transition: '0.1s',
               }}>
                  {/* <button>verev</button> */}
               <div className='verev' style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0px',
                  alignItems: 'flex-start',
                  position: 'relative'
               }}>
                  <button onClick={() => handleScrollTop()} style={{background: 'transparent', color: 'white', border: 'none'}}>{AnimArowTop}</button>
                  <span>EVENT</span>
                  
               </div>
            </div>
            <div
            id='partext2'
               className="partext2"
               style={{
                  position: 'absolute',
                  top: `${animBootomText}px`,
                  transition: '0.1s',
               }}>
               <div className='nerqev' style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '50px',
                  alignItems: 'flex-start',
                  position: 'relative'
               }}>
                  <span>MUSEUM</span>
                  <button onClick={()=> handleScrollBottom()} style={{background: 'transparent', color: 'white', border: 'none'}}> {AnimArrowBottom}</button>
                  
               </div>
               {/* <button>nerqev</button> */}
            </div>
         </div>
      </div>
   );
};

export default Bigtext;
