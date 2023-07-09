import './App.css';
import LoginPage from './Authentification/login.js';
import ContactPage from './ContactPage/contacts.js';
import CreatePage from './Authentification/create.js';
import ProfilePage from './Profile/profile.js';
import MessagePage from './SendMessage/message.js';
import axios from 'axios';
import {Route, Router, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
