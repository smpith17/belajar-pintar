import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes/Router'; // Mengambil konfigurasi route dari folder Routes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;