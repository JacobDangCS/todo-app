import React, { useContext } from 'react';
import ToDo from './Components/ToDo/ToDo';
import Header from './Components/Header/Header';
import SettingsForm from './Components/SettingsForm/SettingsForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import { When } from 'react-if';
import { AuthContext } from './context/Auth/Auth';
import Footer from './Components/Footer/Footer';

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
      <BrowserRouter>
        <Header />
        <When condition={isLoggedIn}>
          <Routes>
            <Route path="/" element={<ToDo />} />
            <Route path="/settings" element={<SettingsForm />} />
          </Routes>
        </When>

        <Auth capability="read" children={<p>I can READ</p>} />

        <Auth capability="create">
          <p>I can CREATE</p>
        </Auth>

        <Auth capability="update">
          <p>I can UPDATE</p>
        </Auth>

        <Auth capability="delete">
          <p>I can DELETE</p>
        </Auth>

        <Footer/>
      </BrowserRouter>
  );
}