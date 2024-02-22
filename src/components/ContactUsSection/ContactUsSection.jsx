import React from 'react'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { Formik } from 'formik'
import * as yup from 'yup';
import './ContactUsSection.css'
import { locationIcon, mailIcon, telIcon } from '../../iconFolder/icon';
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
                            <span>{telIcon}</span>
                            <span htmlFor="phone">+374(10)25-08-25</span>
                        </a>

                        <a href="mailto:Tangaran@gmail.com">
                            <span>{mailIcon}</span>
                            <span htmlFor="mail">Tangaran@gmail.com</span>
                        </a>

                        <a href="https://maps.app.goo.gl/kuVGfv1rwsNptG5C8" target='_blanc'>
                            <span>{locationIcon}</span>
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