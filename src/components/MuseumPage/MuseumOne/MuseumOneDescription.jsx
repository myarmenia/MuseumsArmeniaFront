import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonSecond from '../../ButtonSecond/ButtonSecond';

import reserveImg from '../../../images/reserveImg.png';

const MuseumOneDescription = ({
   description = '',
   photos = [],
   handleClickTicket = () => {},
   openBtn = false,
}) => {
   const { t, i18n } = useTranslation();
   const [activImg, setActivImg] = React.useState(photos[0] || reserveImg);
   const [img1, setImg1] = React.useState(photos[1] || reserveImg);
   const [img2, setImg2] = React.useState(photos[2] || reserveImg);

   const setClickImg = React.useCallback(
      (x) => {
         let reserve = activImg;
         switch (x) {
            case 1:
               setActivImg(img1);
               setImg1(reserve);
               break;

            case 2:
               setActivImg(img2);
               setImg2(reserve);
               break;

            default:
               break;
         }
      },
      [activImg],
   );

   return (
      <div className="museumOne_pageStyle">
         {openBtn && (
            <ButtonSecond
               txt="9"
               minWidth="210px"
               background={'#D5AA72'}
               color={'#FFFFFF'}
               maxWidth={'250px'}
               onClick={() => handleClickTicket('ticket', 'Buy Ticket')}
               newClass="newStyleBtn"
            />
         )}
         <h4 className="museumOne_title">{t(`description_museum`)}...</h4>
         <p>{description}</p>
         {photos.length > 0 && (
            <div className="MuseumOne_parent-imgList">
               <div
                  onClick={() => setClickImg(1)}
                  className="MuseumOne_parent-imgList_img"
                  style={{ backgroundImage: `url(${img1})`, marginRight: '-30px' }}></div>
               <div
                  className="MuseumOne_parent-imgList_imgCenter"
                  style={{ backgroundImage: `url(${activImg})` }}></div>
               <div
                  onClick={() => setClickImg(2)}
                  className="MuseumOne_parent-imgList_img"
                  style={{ backgroundImage: `url(${img2})`, marginLeft: '-30px' }}></div>
            </div>
         )}
      </div>
   );
};

export default MuseumOneDescription;
