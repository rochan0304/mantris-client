import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { ExchangeRatesContext } from './context/ExchangeRatesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExchangeRatesContext>
          <App />
        </ExchangeRatesContext>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
