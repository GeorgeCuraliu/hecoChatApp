import './App.css';
import LoginPage from './Authentification/login.js';
import ContactPage from './ContactPage/contacts.js';
import ProfilePage from './Profile/profile.js';
import MessagePage from './SendMessage/message.js';
import AdminPage from './Admin/admin.js';
import {Route, Router, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [gotMessage, setGotMessage] = useState({})//this useState will hold the value of message received trought web sockets and will send the data to prfile page

  const socket = new WebSocket('ws://localhost:6969/chat');

  // Handle connection open
  socket.onopen = () => {
    const username = document.cookie.split("=")[1].split("/")[0];
    socket.send(JSON.stringify({ type: 'login', username }));
  
  
  };

  // Send message when the user is sending data to the server(its called from sendMessage trought props)
  const sendMessage = (username, message) => {
    socket.send(JSON.stringify({ type: 'message', username, message }));
  };
  
  // Handle incoming messages
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
  
    if (data.type === 'message') {
      console.log('Received message:', data.message);
      setGotMessage({...data.message})
    }
  };








    


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage message={gotMessage}/>} />
        <Route path="/message/:ref" element={<MessagePage sendMessageWS={sendMessage}/>} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </BrowserRouter>
  );
  
}


export default App;
