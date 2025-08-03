import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-mobile-picker': path.resolve(__dirname, '../../dist/react-mobile-picker.js')
    }
  }
})