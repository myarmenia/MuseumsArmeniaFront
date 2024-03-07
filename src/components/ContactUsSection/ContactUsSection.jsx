import React from 'react'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { Formik } from 'formik'
import * as yup from 'yup';
import './ContactUsSection.css'
import {MailIcon, TelIcon, LocationIcon} from '../../iconFolder/icon';

import { useTranslation } from 'react-i18next';

function ContactUsSection() {

    const {t, i18n} = useTranslation()

    const validationSchema = yup.object().shape({
        name: yup.string().required(t('validation_inp.1')),
        phone: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, t('validation_inp.8')).required(t('validation_inp.1')),
        email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),

    })

    const handleFeedback = (e, handleSubmit, isValid) => {
        e.preventDefault()
        if (isValid) {
            console.log('ayo');
        }
    }
    return (
        <div className='contact_us_section'>
            <div className='container'>
                <div className='contact_us_section_block'>

                    <div className='contact_us_section_block_contact_div'>
                        <h3>{t('contact_us_section.0')}</h3>
                        <a href="tel:+374(10)25-08-25">
                            <span><TelIcon/></span>
                            <span htmlFor="phone">+374(10)25-08-25</span>
                        </a>

                        <a href="mailto:Tangaran@gmail.com">
                            <span><MailIcon/></span>
                            <span htmlFor="mail">Tangaran@gmail.com</span>
                        </a>

                        <a href="https://www.google.com/maps/place/%D5%80%D5%A1%D5%B5%D5%A1%D5%BD%D5%BF%D5%A1%D5%B6%D5%AB+%D5%B0%D5%A1%D5%B6%D6%80%D5%A1%D5%BA%D5%A5%D5%BF%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6+%D5%AF%D6%80%D5%A9%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6,+%D5%A3%D5%AB%D5%BF%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6,+%D5%B4%D5%B7%D5%A1%D5%AF%D5%B8%D6%82%D5%B5%D5%A9%D5%AB+%D6%87+%D5%BD%D5%BA%D5%B8%D6%80%D5%BF%D5%AB+%D5%B6%D5%A1%D5%AD%D5%A1%D6%80%D5%A1%D6%80%D5%B8%D6%82%D5%A9%D5%B5%D5%B8%D6%82%D5%B6/@40.1771741,44.5047257,17z/data=!4m14!1m7!3m6!1s0x406abcfa7ecb6691:0x646d566291ff4b8f!2z1YDVodW11aHVvdW_1aHVttWrINWw1aHVttaA1aHVutWl1b_VuNaC1anVtdWh1bYg1a_WgNWp1bjWgtWp1bXVodW2LCDVo9Wr1b_VuNaC1anVtdWh1bYsINW01bfVodWv1bjWgtW11anVqyDWhyDVvdW61bjWgNW_1asg1bbVodWt1aHWgNWh1oDVuNaC1anVtdW41oLVtg!8m2!3d40.1771701!4d44.5095966!16s%2Fg%2F119tmj780!3m5!1s0x406abcfa7ecb6691:0x646d566291ff4b8f!8m2!3d40.1771701!4d44.5095966!16s%2Fg%2F119tmj780?entry=ttu" target='_blanc'>
                            <span><LocationIcon/></span>
                            <span htmlFor="location">0057 Yerevan</span>
                        </a>

                        <a href="" target='_blanc'>  </a>
                    </div>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: ''
                        }}

                        onSubmit={(values, { resetForm }) => {

                            resetForm()
                        }}

                        validateOnBlur

                        validationSchema={validationSchema}
                    >

                        {
                            ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                <form className="feedBack" onSubmit={(e) => handleFeedback(e, handleSubmit, isValid)}>
                                    <div className="name-inp">
                                        <input type="text" name="name" placeholder={t('contact_us_section.1')} value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.name && errors.name && <p className="error">{errors.name}</p>}
                                    </div>

                                    <div className='phone_email_div'>
                                        <div className="phone-inp">
                                            <input type="text" name="phone" placeholder={t('contact_us_section.2')} value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                                            {touched.phone && errors.phone && <p className="error">{errors.phone}</p>}
                                        </div>


                                        <div className="email-inp">
                                            <input type="email" name="email" placeholder={t('contact_us_section.3')} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                            {touched.email && errors.email && <p className="error">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <ButtonSecond txt="2" />
                                </form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ContactUsSection