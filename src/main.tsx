import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://test-web3-airdrop-game.vercel.app/tonconnect-manifest.json">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
