import React from 'react'
import './QrCode.css'
import printer from '../../../images/Printer.png';

function QrCode() {
  return (
    <>
    <div className="QrCode_all">
      <p className="QrCode_title">QR code<span style={{color:"#B26705"}}>(active)</span> <img src={printer} alt="printer" /></p>
      <div className="QrCode_container"></div>
    </div>
    </>
  )
}

export default QrCode