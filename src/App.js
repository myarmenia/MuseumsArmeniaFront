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

function App() {
  const [changeFonSize, setChangeFonSize] = useState('medium')

  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang')  : 'am';

  const navigate = useNavigate();

  const { pathname } = useLocation();


  useEffect(() => {
    pathname == '/' && navigate(`/${leng}/`);
  }, []);

  const changeFont = (type) =>{
    setChangeFonSize(type)
  }

  return (
    <div className={`App  ${changeFonSize}`} >
          <Routes>
              <Route path='/' element={<HomeWraper {...{changeFonSize, changeFont}}/>}>
                <Route path=":leng">
                    <Route path="login" element={<PrivateRouteForRegAndLog><LoginPage /></PrivateRouteForRegAndLog>} />
                    <Route path="register" element={<PrivateRouteForRegAndLog><RegisterPage/></PrivateRouteForRegAndLog>} />

                    <Route index element={<PrivateRouteForOutSider><HomePage {...{changeFonSize, changeFont}}/></PrivateRouteForOutSider>}/>
                    <Route path='museum' element={<h1 style={{height: '20000px'}}>fd</h1>}/>
                </Route>
              </Route>
          </Routes>
    </div>
  );
}

export default App;
