import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { KitchnProvider } from 'kitchn';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KitchnProvider>
      <App />
    </KitchnProvider>
  </StrictMode>,
);
