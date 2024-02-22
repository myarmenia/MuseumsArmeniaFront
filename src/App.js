import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import HomeWraper from './page/HomeWraper';
import HomePage from './components/HomePage/HomePage';
import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

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
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage/>} />

                    <Route index element={<HomePage {...{changeFonSize, changeFont}}/>}/>
                    <Route path='museum' element={<h1 style={{height: '20000px'}}>fd</h1>}/>
                </Route>
              </Route>
          </Routes>
    </div>
  );
}

export default App;
