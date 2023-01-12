import React from 'react';
import ToDo from './Components/ToDo/ToDo';
import Header from './Components/Header/Header';
import SettingsForm from './Components/SettingsForm/SettingsForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Header/>
      <Routes> 
        <Route path="/" element={<ToDo />}/>
        <Route path="/settings" element={<SettingsForm/>}/>
      </Routes>

      <Auth capability="read">
        <p>I can READ</p>
      </Auth>

      <Auth capability="create">
        <p>I can CREATE</p>
      </Auth>

      <Auth capability="update">
        <p>I can UPDATE</p>
      </Auth>
      
      <Auth capability="delete">
        <p>I can DELETE</p>
      </Auth>


      </BrowserRouter>

    );
  }
}