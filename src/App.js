import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import HomeWraper from './page/HomeWraper';
import HomePage from './components/HomePage/HomePage';
import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import PrivateRouteForRegAndLog from './privateRoute/PrivateRouteForRegAndLog';
import PrivateRoute from './privateRoute/PrivateRoute';
import PrivateRouteForOutSider from './privateRoute/PrivateRouteForOutSider';
import ResetSendEmailPage from './components/ResetSendEmailPage/ResetSendEmailPage';
import ResetPasswordPage from './components/ResetPasswordPage/ResetPasswordPage';
import { MuseumLayouts, MuseumPage } from './MuseumPage';

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
               </Route>
            </Route>
         </Routes>
      </div>
   );
}

export default App;
