import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SingleSoundProvider } from './SingleSoundContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SingleSoundProvider>
      <App />
    </SingleSoundProvider>
  </React.StrictMode>
);
