import React from 'react';
import ToDo from './Components/ToDo/ToDo';
import Header from './Components/Header/Header';
import SettingsForm from './Components/SettingsForm/SettingsForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Header/>
      <Routes> 
        <Route path = '/' element = {<ToDo />}/>
        <Route path = '/settings' element = {<SettingsForm/>}/>
      </Routes>
      </BrowserRouter>
    );
  }
}
