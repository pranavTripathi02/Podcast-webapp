import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.tsx';
import { PodcastProvider } from './context/podcastContext.tsx';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PodcastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PodcastProvider>
    </AuthProvider>
  </React.StrictMode>
);
