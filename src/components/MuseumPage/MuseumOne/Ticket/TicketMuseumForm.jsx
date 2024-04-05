import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { selectIcon } from '../../../../iconFolder/icon';
import { useDispatch, useSelector } from 'react-redux';
import { postMuseumTicket } from '../../../../store/slices/MuseumTicket/MuseumTicketApi';

import './TicketMuseumBlock.css';
import { selectBuyTicket } from '../../../../store/slices/BuyTicketSlice/BuyTicketSlice';
import { postBuyTicket } from '../../../../store/slices/BuyTicketSlice/BuyTicketApi';
const TicketMuseumForm = () => {
   const leng = localStorage.getItem('lang');
   const { t, i18n } = useTranslation();
   const [countryVal, setCountryVal] = useState('');
   const dispatch = useDispatch();

   const respBuyTicket = useSelector(selectBuyTicket)
   const {dataItems, ticketLoading, success, responseMessages, paymentsUrl } =
      useSelector((state) => state.museumTicket);


   const validationSchema = yup.object().shape({
      email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
   });

   const handleRegister = (e, handleSubmit, isValid) => {
      handleSubmit();
      e.preventDefault();

      const { name, surname, email, phone, country, age, gender } = e.target;
      if (email.value && isValid) {
         const person = {
            email: email.value,

         };

         if (name.value) {
            person.name = name.value;
         }
         if (phone.value) {
            person.phone = phone.value;
         }
         if (age.value) {
            person.age = age.value;
         }
         if (surname.value) {
            person.surname = surname.value;
         }
         if (country.value) {
            person.country_id = country.value;
         }
         if (gender.value) {
            person.gender = gender.value;
         }

         dispatch(
            postMuseumTicket({
               userToken: null,
               postData: {
                  request_name: 'web',
                  person,
                  items: respBuyTicket?.obj?.items ? respBuyTicket?.obj.items : dataItems,
               },
            }),
         );

         
         
      }

    
   };

   const handleChangeCountry = (val, type) => {
      setCountryVal(val);
   };

   const countries = t('country', { returnObjects: true });

   return (
      <div className="museumTicket-formChild">
         <div className="museumTicket-formChild-block">
            <Formik
               initialValues={{
                  email: '',
                  name: '',
                  surname: '',
                  phone: '',
                  country: '',
                  age: '',
                  gender: '',
               }}
               onSubmit={(values, { resetForm }) => {
                  // resetForm()
               }}
               validateOnBlur
               validationSchema={validationSchema}>
               {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty,
               }) => (
                  <form
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '20px 30px',
                     }}
                     onSubmit={(e) => handleRegister(e, handleSubmit, isValid)}>
                     <div className="museumTicket-formChild-inbut">
                        <input
                           type="email"
                           name="email"
                           placeholder={t('placeholder.5')}
                           value={values.email}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className="formChild-inbut"
                        />
                        {touched.email && errors.email && <p className="error">{errors.email}</p>}
                     </div>
                     <div className="museumTicket-formChild-inbut">
                        <input
                           type="text"
                           name="name"
                           placeholder={t('placeholder.3')}
                           value={values.name}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className="formChild-inbut"
                        />
                        {touched.name && errors.name && <p className="error">{errors.name}</p>}
                     </div>

                     <div className="museumTicket-formChild-inbut">
                        <input
                           type="text"
                           name="surname"
                           placeholder={t('placeholder.4')}
                           value={values.surname}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className="formChild-inbut"
                        />
                        {touched.surname && errors.surname && (
                           <p className="error">{errors.surname}</p>
                        )}
                     </div>

                     <div className="museumTicket-formChild-inbut">
                        <input
                           type="text"
                           name="phone"
                           placeholder={t('placeholder.7')}
                           value={values.phone}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className="formChild-inbut"
                        />
                        {touched.phone && errors.phone && <p className="error">{errors.phone}</p>}
                     </div>

                     <div className="museumTicket-formChild-inbut">
                        <div className="country-inp museumTicket-formChild-inbut">
                           <input
                              type="text"
                              name="country"
                              placeholder="country"
                              value={countryVal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="formChild-inbut"
                           />
                           <div className="country_div">
                              {countries.map((value, index) => (
                                 <div
                                    key={index}
                                    onClick={() =>
                                       handleChangeCountry(
                                          Object.values(value)[0],
                                          Object.keys(value)[0],
                                       )
                                    }>
                                    {Object.values(value)[0]}
                                 </div>
                              ))}
                           </div>
                           {touched.country && errors.country && (
                              <p className="error">{errors.country}</p>
                           )}

                           <span className="museumTicket-selectIcon">{selectIcon}</span>
                        </div>
                     </div>

                     <div className="age-inp museumTicket-formChild-inbut">
                        <input
                           type="date"
                           name="age"
                           placeholder="age"
                           value={values.age}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className="formChild-inbut"
                        />
                        {touched.age && errors.age && <p className="error">{errors.age}</p>}
                     </div>

                     <div className="ticketForm-blockradio">
                        <label>
                           <input type="radio" value="female" name="gender" />
                           <span>{t('gender_type.0')}</span>
                        </label>

                        <label>
                           <input type="radio" value="male" name="gender" />
                           <span>{t('gender_type.1')}</span>
                        </label>

                        <label>
                           <input type="radio" value="other" name="gender" />
                           <span>{t('gender_type.2')}</span>
                        </label>
                     </div>

                     {ticketLoading === 'rejected' && (
                        <div className="BuyTicketBlock-list-warning">
                           {success === false && <p>{responseMessages}</p>}
                        </div>
                     )}
                     <button type="submit" className="register_btn">
                        {t('register_btn')}
                     </button>
                  </form>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default TicketMuseumForm;
