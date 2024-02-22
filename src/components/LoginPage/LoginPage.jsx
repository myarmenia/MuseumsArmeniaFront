import React, { useRef } from 'react'
import { Formik } from "formik";
import * as yup from 'yup';
import './LoginPage.css'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { postLogin } from '../../store/slices/LoginSlice/LoginApi';

function LoginPage() {
    const leng = localStorage.getItem('lang')
    const {t, i18n} = useTranslation()

    const checkRef = useRef(null)

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
        password: yup.string().required(t('validation_inp.1'))
    })

    const handleLogin = (e, handleSubmit, isValid) => {
        handleSubmit()
        e.preventDefault()
        const {email, password} = e.target

        if (email.value && password.value && isValid) {
            const loginObj = {
                email: email.value,
                password: password.value,
                remember_me: checkRef.current.checked
            }

            dispatch(postLogin(loginObj))
        }
    }


  return (
    <div className='login_page'>
        <div className='container'>
            <div className='login_block'>
                <div className='login_block_navigation'>
                    <NavLink className={({isActive})=> isActive ? 'active-element':''} to={`/${leng}/login`}>{t('login_btn')}</NavLink>
                    <NavLink className={({isActive})=> isActive ? 'active-element':''} to={`/${leng}/register`}>{t('register_btn')}</NavLink>
                </div>
                <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                remember: ''
                            }}

                            onSubmit={(values, { resetForm }) => {

                                resetForm()
                            }}

                            validateOnBlur

                            validationSchema={validationSchema}
                        >

                            {
                                ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                    <form className="login" onSubmit={(e) => handleLogin(e, handleSubmit, isValid)}>
                                            
                                            <span>{t('login_btn')}</span>
                                            <div className="email-inp">
                                                <input type="email" name="email" placeholder={t('placeholder.0')} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                                            </div>

                                            <div className="password">
                                                <input type="password" name="password" placeholder={t('placeholder.1')} value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.password && errors.password && <p className="error">{errors.password}</p>}
                                            </div>

                                            <div className='remember_me'>
                                                <span>{t('placeholder.2')}</span>
                                                <input ref={checkRef} type="checkbox" name='remember_me' />
                                            </div>

                                        <button className='login_btn'>{t('login_btn')}</button>

                                        <p>{t('reset_password_btn.0')}  <NavLink className="reset_password" to={`/${leng}/reset-password`}>{t('reset_password_btn.1')}</NavLink></p>
                                        <p>{t('redirect_register.0')}  <NavLink className="redirect_register" to={`/${leng}/register`}>{t('redirect_register.1')}</NavLink></p>

                                        <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                const decodedHeader = jwtDecode(credentialResponse.credential);
                                                console.log(decodedHeader);
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                            />
                                    </form>
                                )
                            }
                        </Formik>
            </div>
        </div>
    </div>
  )
}

export default LoginPage