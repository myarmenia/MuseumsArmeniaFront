import React, { useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const NotUserMessagesBlock = () => {
   const { t, i18n } = useTranslation();

   const validationSchema = yup.object().shape({
      email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
      messages: yup.string().required(t('validation_inp.1')),
   });

   const handleLogin = (e, handleSubmit, isValid) => {
      handleSubmit();
      e.preventDefault();
      const { email, messages } = e.target;

      if (email.value && messages.value && isValid) {
         const loginObj = {
            email: email.value,
            messages: messages.value,
         };
        
         //  dispatch(postLogin(loginObj))
      }
   };

   return (
     
         <Formik
            initialValues={{
               email: '',
               messages: '',
            }}
            onSubmit={(values, { resetForm }) => {
               resetForm();
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
               <form className="NotUserMessages-form" onSubmit={(e) => handleLogin(e, handleSubmit, isValid)}>
                  {/* <span>{t('login_btn')}</span> */}
                  <div className="email-inp">
                     <input
                      className="messages_block-inpEmail"
                        type="email"
                        name="email"
                        placeholder={t('placeholder.0')}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                     />
                     {touched.email && errors.email && <p className="error">{errors.email}</p>}
                  </div>

                  <div>
                     {/* <input
                        type="text"
                        name="messages"
                        placeholder={t('placeholder.8')}
                        value={values.messages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                     /> */}
                     <textarea
                        className="messages_block-textArea"
                        type="text"
                        name="messages"
                        placeholder={t('placeholder.8')}
                        value={values.messages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                     ></textarea>
                     {touched.messages && errors.messages && (
                        <p className="error_textarea">{errors.messages}</p>
                     )}
                  </div>

                  <button type='submit' className="login_btn">{t('login_btn')}</button>
               </form>
            )}
         </Formik>
      
   );
};

export default NotUserMessagesBlock;
