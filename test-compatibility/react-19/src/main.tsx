import React from 'react'
import ReactDOM from 'react-dom/client'
import { TestApp } from '../../shared-test'

// React 19 style (same as 18)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
)