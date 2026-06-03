import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//add os imports de baixo e fiquei meio pah de tirar os de cima pq nao sei oq fazem

//importando bootstrap por causa da navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//css geral (todos os do zip juntos)
import './style/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
