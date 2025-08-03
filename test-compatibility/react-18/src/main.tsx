import React from 'react'
import ReactDOM from 'react-dom/client'
import { TestApp } from '../../shared-test'

// React 18 style
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
)