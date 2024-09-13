import React, { useEffect, useRef, useState } from 'react';
import './QrCode.css';
import printer from '../../../images/Printer.png';
import download from '../../../images/download.svg';
import sendEmail from '../../../images/sendEmail.png';
import { useDispatch, useSelector } from 'react-redux';
import { getQr, postQrItem } from '../../../store/slices/ProfilePageSlice/ProfilePageApi';
import { selectQrData, selectQrResult } from '../../../store/slices/ProfilePageSlice/ProfilePageSlice';
import { LocationIcon, setingIcon } from '../../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { downloadImage } from '../../../helper/ProfileSidebarHelp/ProfileSidebarHelp';
import { Link } from 'react-router-dom';
import OutSideErrorModal from '../../OutSideErrorModal/OutSideErrorModal';

function QrCode() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const respQrData = useSelector(selectQrData);
  const respQrResult = useSelector(selectQrResult)
  const [modalOpen, setModalOpen] = useState(false);
  const [qrMessage, setQrMessage] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(getQr());
  }, []);

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false); // Change this line
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  const openModal = (event, qrId) => {
    event.preventDefault();
    setModalOpen(qrId);
  };

  const ticketsType_for_private = t('ticketsType_for_private', { returnObjects: true });

  useEffect(()=> {
    if(respQrResult.success) {
      setQrMessage(true);
    setTimeout(() => {
        setQrMessage(false);
      }, 4000); 
    }
  },[respQrResult])

  return (
    <div className="QrCode_all">
      <div className='container'>
        <p className="QrCode_title">QR code<span style={{ color: "#B26705" }}>(active)</span> <img style={{ cursor: 'pointer' }} src={printer} alt="printer" onClick={() => window.print()}/></p>
        <div className="qr_code_items">
          {respQrData?.data && respQrData?.data.map(qrItem => (
            <div key={qrItem.id} className='qr_code_item'>
              <div className='qr_code_item_img_div' style={{ background: qrItem.color }}>
                <img src={qrItem.path} alt={qrItem.museum_address} />
              </div>
              <div className='qr_code_item_info_div'>
                {qrItem.museum_name.map((el, index) => (
                  <p key={index} className='qr_code_item_info_div_name_museum'>{el}</p>
                ))}
                {qrItem.museum_address && (
                  <div className='qr_code_item_info_div_addres_div'>
                    <LocationIcon width={12} height={12} fill='#575757' />
                    <span className='qr_code_item_info_div_addres'>{qrItem.museum_address}</span>
                  </div>
                )}
                {ticketsType_for_private.map(ticket => {
                  if (Object.keys(ticket)[0] === qrItem.type) {
                              return <span key={qrItem.id}>{Object.values(ticket)[0]}</span>
                            }
                            else if (qrItem.type === 'event-config' && Object.keys(ticket)[0] === 'event_config') {
                              return <span key={qrItem.id}>{Object.values(ticket)[0]}</span>
                           }
                })}
                <div className='price_and_openModal_div'>
                  <p>{qrItem.price} AMD</p>
                  <span onClick={(e) => openModal(e, qrItem.id)}>{setingIcon}</span>
                </div>
              </div>
              {modalOpen === qrItem.id && (
                <div className="modal" ref={modalRef}>
                  <div className="modal-content" onClick={handleModalClick}>
                    <div className="modal-content_div">
                      <div className="modal-content_div_line" onClick={() => downloadImage(qrItem.path_base64)}>
                        <img src={download} alt="download" />
                        <span>{t('qr_modal.0')}</span>
                      </div>
                      <div className="modal-content_div_line" onClick={() => dispatch(postQrItem(qrItem.id))}>
                        <img src={sendEmail} alt="sendEmail" /> <span>{t('qr_modal.2')}</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      { respQrResult.success && qrMessage && <OutSideErrorModal txt={respQrResult.message} shadow={true}/>}
      {console.log(respQrResult, '55', qrMessage)}
    </div>
  );
}

export default QrCode;
