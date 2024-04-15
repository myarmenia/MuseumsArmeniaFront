import React from 'react'
import './OutSideErrorModal.css'

function OutSideErrorModal({txt}) {
  return (
    <div className='out_side_error_modal'>
        <span>{txt}</span>
    </div>
  )
}

export default OutSideErrorModal