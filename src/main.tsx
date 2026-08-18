import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Removed the .jsx/.tsx suffix; Vite/TS resolves it automatically
import './index.css'

// The trailing "!" tells TS: "Trust me, root will always exist"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)