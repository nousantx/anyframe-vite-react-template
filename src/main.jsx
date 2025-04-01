import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'virtual:anyframe.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if (import.meta.env.DEV) {
  Promise.all([import('@nousantx/anyframe-dom'), import('../.config/anyframe.js')])
    .then(([{ init }, config]) => {
      const anyframeConfig = config.default || config

      init({
        config: anyframeConfig || {
          preflight: true
        }
      })
    })
    .catch((err) => {
      console.error('Failed to load development dependencies:', err)
    })
}
