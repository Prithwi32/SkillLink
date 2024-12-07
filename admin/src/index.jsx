import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EventCreationForm from './components/EventCreation.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventCreationForm />
  </React.StrictMode>
);

