import React, { useEffect, useState } from 'react'
import './ChangeFontSize.css'

function ChangeFontSize({changeFonSize, changeFont}) {

  
  return (
    <div className='change_font'>
      <img src={require('../../images/zoomtext.png')} alt="fontSize" />
       <ul className='font_list'>
           <li style={{fontSize: '25px'}}  onClick={() => changeFont('large')}>A</li>
           <li style={{fontSize: '20px'}} onClick={() => changeFont('medium')}>A</li>
           <li style={{fontSize: '17px'}} onClick={() => changeFont('small')}>A</li>
       </ul>
    </div>
  )
}

export default ChangeFontSize