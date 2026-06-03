import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initReveal } from './utils/reveal.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Wait for React to paint before observing scroll-reveal elements
requestAnimationFrame(() => requestAnimationFrame(initReveal))
