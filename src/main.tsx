import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Quitado el .jsx/.tsx, Vite/TS lo resuelve automáticamente
import './index.css'

// Se añade el "!" al final para decirle a TS: "Confía en mí, root siempre existirá"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)