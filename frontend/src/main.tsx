// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Importa los estilos globales si los tienes
import App from './App'
import '@fortawesome/fontawesome-free/css/all.min.css' // Importa FontAwesome

const root = document.getElementById('root')!
const rootElement = ReactDOM.createRoot(root)

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
