import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './modules/context/AuthProvider.jsx'
import { IncidentsProvider } from './modules/context/IncidentsContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import "flowbite";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <IncidentsProvider>
          <App />
        </IncidentsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
