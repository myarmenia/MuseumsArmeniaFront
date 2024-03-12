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

import AbouteUsPage from './components/AbouteUsPage/AbouteUsPage';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import { MuseumLayouts, MuseumPage, MuseumOne } from '../src/components/MuseumPage/index';
import SaleTicketPage from './components/SaleTicketPage/SaleTicketPage';
import Shop from './components/Shop/Shop';
import SingleShop from './components/SingleShop/SingleShop';


function App() {
   const [changeFonSize, setChangeFonSize] = useState('');

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
                     path="museums"
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
                     <Route
                        path="museum/:id"
                        element={
                           <PrivateRouteForOutSider>
                              <MuseumOne />
                           </PrivateRouteForOutSider>
                        }
                     />
                  </Route>

                    <Route path="news" element={<Newses {...{changeFonSize}}/>} />
                    <Route path="news/:id" element={<SingleNews/>} />
                    <Route path='privacy-policy' element={<PrivacyPolicy/>}/>
                    <Route path="store" element={<Shop/>} />
                    <Route path="store/:id" element={<SingleShop/>} />
                    <Route path='aboute-us' element={<PrivateRouteForOutSider><AbouteUsPage/></PrivateRouteForOutSider>}/>
                    <Route path='ticket-sale' element={<PrivateRouteForOutSider><SaleTicketPage/></PrivateRouteForOutSider>}/>

               </Route>
            </Route>
         </Routes>
      </div>
   );
}

export default App;
