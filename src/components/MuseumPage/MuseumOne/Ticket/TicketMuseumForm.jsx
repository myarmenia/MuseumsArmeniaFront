import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { selectIcon } from '../../../../iconFolder/icon';
import { useDispatch, useSelector } from 'react-redux';
import { postMuseumTicket } from '../../../../store/slices/MuseumTicket/MuseumTicketApi';
import { customBasesUrlFunc } from '../../customBasesUrlFunc';
import './TicketMuseumBlock.css';
import { selectBuyTicket, setObj } from '../../../../store/slices/BuyTicketSlice/BuyTicketSlice';
import { getComboTicketsData } from '../../../../store/slices/ComboTicket/ComboTicketSlice';
import { setNotificationStatus } from '../../../../store/slices/MuseumPagesSlice/MuseumPagesSlice';
import { setIsActiveModal } from '../../../../store/slices/SingleEventSlice/SingleEventSlice';
const TicketMuseumForm = () => {
   const leng = localStorage.getItem('lang');
   const { t, i18n } = useTranslation();
   const [countryVal, setCountryVal] = useState({});
   const [region, setRegion] = useState('');
   const [statusRegion, setStatusRegion] = useState(false);

   const dispatch = useDispatch();
   const ComboTicketsData = useSelector(getComboTicketsData);

   const respBuyTicket = useSelector(selectBuyTicket);
   const { dataItems, ticketLoading, responseMessages, ticketType } = useSelector(
      (state) => state.museumTicket,
   );
   const validationSchema = yup.object().shape({
      email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
   });
   const handleRegister = async(e, handleSubmit, isValid) => {
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
            person.country_id = countryVal.key;
         }
         if (gender.value) {
            person.gender = gender.value;
         }

        await dispatch(
            postMuseumTicket({
               userToken: null,
               postData: {
                  redirect_url: customBasesUrlFunc().baseUrl,
                  request_name: 'web',
                  person,
                  items:
                     ticketType.ticketType === 'standart' && respBuyTicket?.obj?.items
                        ? respBuyTicket.obj.items
                        : ticketType.ticketType === 'combo' && ComboTicketsData.length > 0
                        ? ComboTicketsData
                        : dataItems,
               },
            }),
         ).then((res) => {
            if(res.payload?.success){
               // dispatch(setIsActiveModal(false));
               console.log('tnadz');
               
            }
            
         })

         // dispatch(setObj({}));
      }
   };

   const handleChangeCountry = React.useCallback((val) => {
      setCountryVal({
         key: Object.keys(val)[0],
         values: Object.values(val)[0],
      });
   }, []);

   const countries = t('country', { returnObjects: true });
   const resSearchCountries = countries
      .filter((obj) => {
         if (Object.values(obj)[0].toLowerCase().includes(region.toLowerCase())) {
            return true;
         }
         return false;
      })
      .map((el) => el);

   const searchValue = React.useCallback(
      (e) => {
         const res = countries.filter(
            (obj) => Object.values(obj)[0].toLowerCase() === e.target.value.toLowerCase(),
         );
         if (res.length) {
            setCountryVal({
               key: Object.keys(res[0])[0],
               values: Object.values(res[0])[0],
            });
         }
         setRegion(e.target.value);
         setStatusRegion(true);
      },
      [countries],
   );

   useEffect(() => {
      if (ticketLoading === 'rejected' && responseMessages) {
         dispatch(
            setNotificationStatus({
               species: false,
               open: true,
               messages: responseMessages,
            }),
         );
         setTimeout(() => {
            dispatch(
               setNotificationStatus({ species: false, open: false, messages: responseMessages }),
            );
         }, 8000);
      }
   }, [ticketLoading]);

   return (
      <div className="museumTicket-formChild">
         <div className="museumTicket-formChild-header">
            <p>{t(`isWrong.3`)}</p>
            <p className='museumTicket_formChild_header_span'>{t(`isWrong.4`)}</p>
         </div>
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
                        {touched.email && errors.email && (
                           <p className="error_formik" style={{ color: 'red' }}>
                              {errors.email}
                           </p>
                        )}
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
                        {touched.name && errors.name && <p className="error_formik">{errors.name}</p>}
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
                           <p className="error_formik">{errors.surname}</p>
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
                        {touched.phone && errors.phone && <p className="error_formik">{errors.phone}</p>}
                     </div>

                     <div className="museumTicket-formChild-inbut">
                        <div className="country-inp museumTicket-formChild-inbut">
                           <input
                              type="text"
                              name="country"
                              placeholder={t('placeholder.10')}
                              // placeholder={Object.values(countries[0])[0]}
                              value={statusRegion ? region : countryVal?.values}
                              onChange={(e) => {
                                 handleChange(e);
                                 searchValue(e);
                              }}
                              onBlur={handleBlur}
                              className="formChild-inbut"
                           />
                           <div className="country_div">
                              {resSearchCountries.map((value, index) => (
                                 <div
                                    key={index}
                                    onClick={() => {
                                       handleChangeCountry(value);
                                       setStatusRegion(false);
                                    }}>
                                    {Object.values(value)[0]}
                                 </div>
                              ))}
                           </div>
                           {touched.country && errors.country && (
                              <p className="error_formik">{errors.country}</p>
                           )}

                           <span className="museumTicket-selectIcon">{selectIcon}</span>
                        </div>
                     </div>

                     <div className="age-inp museumTicket-formChild-inbut">
                        <input
                           type="number"
                           name="age"
                           placeholder={t('placeholder.11')}
                           value={values.age}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className="formChild-inbut"
                        />
                        {touched.age && errors.age && <p className="error_formik">{errors.age}</p>}
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

                     <button type="submit" className="register_btn">
                        {t('buy')}
                     </button>
                  </form>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default React.memo(TicketMuseumForm);
