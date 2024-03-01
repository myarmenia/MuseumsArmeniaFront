import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import HomeWraper from './page/HomeWraper';
import HomePage from './components/HomePage/HomePage';
import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Newses from './components/Newses/Newses';
import SingleNews from './components/SingleNews/SingleNews';
import PrivateRouteForRegAndLog from './privateRoute/PrivateRouteForRegAndLog';
import PrivateRoute from './privateRoute/PrivateRoute';
import PrivateRouteForOutSider from './privateRoute/PrivateRouteForOutSider';
import ResetSendEmailPage from './components/ResetSendEmailPage/ResetSendEmailPage';
import ResetPasswordPage from './components/ResetPasswordPage/ResetPasswordPage';
import { MuseumLayouts, MuseumPage } from '../src/components/MuseumPage/index';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

function App() {
   const [changeFonSize, setChangeFonSize] = useState('medium');

   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';

   const navigate = useNavigate();

   const { pathname } = useLocation();

   useEffect(() => {
      pathname == '/' && navigate(`/${leng}/`);
   }, []);

   const changeFont = (type) => {
      setChangeFonSize(type);
   };

   return (
      <div className={`App  ${changeFonSize}`}>
         <Routes>
            <Route path="/" element={<HomeWraper {...{ changeFonSize, changeFont }} />}>
               <Route path=":leng">
                  <Route
                     path="login"
                     element={
                        <PrivateRouteForRegAndLog>
                           <LoginPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />
                  <Route
                     path="register"
                     element={
                        <PrivateRouteForRegAndLog>
                           <RegisterPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />
                  <Route
                     path="reset-password-send-email"
                     element={
                        <PrivateRouteForRegAndLog>
                           <ResetSendEmailPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />
                  <Route
                     path="reset-password"
                     element={
                        <PrivateRouteForRegAndLog>
                           <ResetPasswordPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />

                  <Route
                     index
                     element={
                        <PrivateRouteForOutSider>
                           <HomePage {...{ changeFonSize, changeFont }} />
                        </PrivateRouteForOutSider>
                     }
                  />
                  <Route
                     path="museum"
                     element={
                        <PrivateRouteForOutSider>
                           <MuseumLayouts />
                        </PrivateRouteForOutSider>
                     }>
                     <Route
                        index
                        element={
                           <PrivateRouteForOutSider>
                              <MuseumPage />
                           </PrivateRouteForOutSider>
                        }
                     />
                  </Route>
                    <Route path="news" element={<Newses {...{changeFonSize}}/>} />
                    <Route path="news/:id" element={<SingleNews/>} />
                    <Route path='privacy-policy' element={<PrivacyPolicy/>}/>
               </Route>
            </Route>
         </Routes>
      </div>
   );
}

export default App;
