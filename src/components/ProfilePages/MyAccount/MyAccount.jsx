import React, { useEffect, useRef, useState } from 'react';
import './MyAccount.css';
import logOutGray from '../../../images/logOutGray.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../../../store/slices/Auth/AuthSlice';
import { useTranslation } from 'react-i18next';
import { postChangeUserPass, postEditUser } from '../../../store/slices/ProfilePageSlice/ProfilePageApi';
import * as yup from 'yup';
import { Formik } from 'formik';
import { eyeIcon } from '../../../iconFolder/icon';

function MyAccount() {

  const authUser = useSelector(getAuthUser)
  const { t, i18n } = useTranslation();
  const countries = t('country', { returnObjects: true });
  const [isOpen, setIsOpen] = useState(false);
  const [newInfo, setNewInfo] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ value: '', key: '' });
  const [viewPassword, setViewPassword] = useState(true)
  const [viewConfirmPassword, setConfirmViewPassword] = useState(true)
  const [viewCurrentPassword, setViewCurrentPassword] = useState(true)

  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    password: yup.string()
      .min(8, t('validation_inp.2'))
      .matches(/[0-9]/, t('validation_inp.3'))
      .matches(/[a-z]/, t('validation_inp.4'))
      .matches(/[A-Z]/, t('validation_inp.5'))
      .required(t('validation_inp.6')),
      currentPassword: yup.string().required(t('validation_inp.6')),
    confirmPassword: yup.string().oneOf([yup.ref('password')], t('validation_inp.7')).required(t('validation_inp.6')),

  })

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = async (e, option) => {
    setNewInfo({ ...newInfo, country: option.key })
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const inpName = e.target.name;
    const inputValue = e.target.value;

    if (inpName !== 'country') {
      setNewInfo({ ...newInfo, [inpName]: inputValue });
    }
  };





  const handleSubmit = (e) => {
    e.preventDefault()
    newInfo && dispatch(postEditUser(newInfo))
  }


  const handleChangePassword = (e, handleSubmit, isValid) =>{
    e.preventDefault()

    handleSubmit()

    const newPass = {
      currentPassword: e.target[0].value,
      password: e.target[1].value,
      confirmPassword: e.target[2].value
    }

    if (e.target[0].value && e.target[1].value && e.target[2].value && isValid) {
      dispatch(postChangeUserPass(newPass))
    }
  }
  return (
    <div className="MyAccount_all">
      <div className="MyAccount_big_div">
        <p className="MyAccount_title">My Account</p>
        <form onSubmit={handleSubmit}>
          <div className="top_inputes">
            <input
              name='name'
              type="text"
              className="MyAccount_input-name" placeholder='name' defaultValue={authUser?.name} onChange={handleChange} />
            <input name='surname' type="text" className="MyAccount_input-surname" placeholder='surname' defaultValue={authUser?.surname} onChange={handleChange} />
            <input name='phone' type="text" className="MyAccount_input-phone" placeholder='phone' defaultValue={authUser?.phone} onChange={handleChange} />

            <div className={`dropdown ${isOpen ? 'menu-open' : ''}`}>
              <div className='select' onClick={toggleDropdown}>
                <input name='country' className={`selected ${selectedOption.value ? '' : 'placeholder'}`} value={selectedOption.value || 'placeholder'} onBlur={handleChange} />
                <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
              </div>
              {
                isOpen &&
                (
                  <ul className='menu'>

                    {countries.map((value, index) => (
                      <li
                        key={index}
                        onClick={(e) => selectOption(e, { value: Object.values(value)[0], key: Object.keys(value)[0] })}
                      >
                        {Object.values(value)[0]}
                      </li>
                    ))}
                  </ul>
                )
              }
            </div>
            {/* </select> */}
            <input
              name='date'
              type="date"
              className="MyAccount_input-date "
              defaultValue={authUser?.birth_date}
              onChange={handleChange}
            />
          </div>
          <div className="gender_div">
            <p>Enter your Gender</p>
            <div className="gender_div_inputes">
              <div className="gender_div_input_div">
                <input type="radio" className="gender_div_input" name="gender" value="female" defaultChecked={authUser.gender === 'female' ? true : false} onChange={handleChange} />
                <span>Female</span>
              </div>
              <div className="gender_div_input_div">
                <input type="radio" className="gender_div_input" name="gender" value="male" defaultChecked={authUser.gender === 'male' ? true : false} onChange={handleChange} />
                <span>Male</span>
              </div>
              <div className="gender_div_input_div">
                <input type="radio" className="gender_div_input" name="gender" value="other" defaultChecked={authUser.gender === 'other' ? true : false} onChange={handleChange} />
                <span>Other</span>
              </div>
            </div>
          </div>

          <div className='profile_edit_btn_div'>
            <button className='profile_edit_btn'>Save</button>
          </div>
        </form>

        <Formik
          initialValues={{
            confirmPassword: '',
            password: '',
            currentPassword: ''
          }}

          onSubmit={(values, { resetForm }) => {


          }}

          validateOnBlur

          validationSchema={validationSchema}
        >

          {
            ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
              <form className="profile_edit_password"  onSubmit={(e) => handleChangePassword(e, handleSubmit, isValid)}>

                <div className="profile_edit_password_inp input_div">
                  <input type={viewCurrentPassword ? 'password' : 'text'} name="currentPassword" placeholder={t('placeholder.9')} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                  <span onClick={() => setViewCurrentPassword(!viewCurrentPassword)}>{eyeIcon}</span>
                  {touched.currentPassword && errors.currentPassword && <p className="error">{errors.currentPassword}</p>}
                </div>
                <div className="profile_edit_password_inp input_div">
                  <input type={viewPassword ? 'password' : 'text'} name="password" placeholder={t('placeholder.1')} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                  <span onClick={() => setViewPassword(!viewPassword)}>{eyeIcon}</span>
                  {touched.password && errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="profile_confirm-password-inp input_div">
                  <input type={viewConfirmPassword ? 'password' : 'text'} name="confirmPassword" placeholder={t('placeholder.6')} value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                  <span onClick={() => setConfirmViewPassword(!viewConfirmPassword)}>{eyeIcon}</span>
                  {touched.confirmPassword && errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>

                <div className='profile_edit_btn_div'>
                  <button className='profile_edit_btn'>Save</button>
                </div>

              </form>
            )
          }
        </Formik>
        <div className="log_out_myAccount">
          <img src={logOutGray} alt="logOutGray" />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
