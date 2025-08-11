import { ToastContainer } from 'react-toastify';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-toastify/dist/ReactToastify.css'
import { JobApp } from './components copy/JobApp';
import { Login } from './components copy/Login';
import { Register } from './components copy/Register';
import { PageNotFound } from './components copy/PageNotFound';
import { LandingPage } from './components copy/LandingPage';

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

    return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/JobApp' element={<JobApp />} />
          <Route path='*' element={<PageNotFound />} /> 
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
