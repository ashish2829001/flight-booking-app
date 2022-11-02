import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import ConfirmationPage from './Components/ConfirmationPage/ConfirmationPage';

function App() {
  
  const [bookingData, setBookingData] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home bookingData={bookingData} setBookingData={setBookingData} />} />
        <Route path="/confirmation_page" element={<ConfirmationPage bookingData={bookingData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
