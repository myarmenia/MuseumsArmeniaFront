import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRegisterData, selectRegisterError, selectRegisterLoading } from '../../store/slices/RegisterSlice/RegisterSlice'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import './VerificationComponent.css'
import { postVerifyAccount } from '../../store/slices/VerifyAccountSlice/VerifyAccountApi'
import { getData, selectVerifyAccount } from '../../store/slices/VerifyAccountSlice/VerifyAccountSlice'

 function VerificationComponent({email, setOpenVerifyModal}) {
    console.log(email.current.value,'ffss');
    
    const [otp, setOtp] = useState(new Array(5).fill(""))
    const dispatch = useDispatch()
    const respRegiterData = useSelector(selectRegisterData)
    const registerLoading = useSelector(selectRegisterLoading)
    const errMessage = useSelector(getData)

    console.log(errMessage,'dhchbhjhj');

    console.log(respRegiterData,'ggggggg');
    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false
            
        setOtp([...otp.map((data, indx) => (indx === index ? e.target.value : data))])

        if(e.target.value && e.target.nextSibling){
            e.target.nextSibling.focus()
        }
    }


    const handleSubmitVerificationForm = (e) =>{
        e.preventDefault()

        const [inp1, inp2, inp3, inp4, inp5] = e.target

        if (inp1.value && inp2.value && inp3.value && inp4.value && inp5.value) {
            
            const verificationObj = {
                token: `${inp1.value}${inp2.value}${inp3.value}${inp4.value}${inp5.value}`,
                email: email.current.value
            }

            dispatch(postVerifyAccount(verificationObj))
        }
    }

  return (
    <>
    {registerLoading === 'pending' ? <LoadSpinner/> : <div className='verification_modal' onClick={() => setOpenVerifyModal(false)}>
        <form className='verification_modal_block' onSubmit={handleSubmitVerificationForm} onClick={(e) => e.stopPropagation()}>
        <p>{respRegiterData?.message}</p>

            {registerLoading === 'fulfilled' && <div className='opt_div_verify'>
                <div className='verify_inputs_div'>
                    {
                      otp.map((data, i) => {
                            return <input key={i} type='text' maxLength={1} value={data} onChange={(e) => handleChange(e, i)}/>
                        })
                    }
                </div>
                    <span>{errMessage?.message}</span>


                <button type='submit' className='verification_btn'>Send</button>
            </div>}
        </form>

    </div>}
    
    </>
  )
}

export default VerificationComponent