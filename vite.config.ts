import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isServe = command === 'serve'
  
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        entryRoot: resolve(__dirname, './lib'),
      }),
    ],
    resolve: {
      alias: {
        'react-mobile-picker': resolve(__dirname, './lib'),
      },
    },
    define: isServe ? {} : {
      'process.env.NODE_ENV': '"production"',
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/index.ts'),
        name: 'Picker',
        fileName: 'react-mobile-picker',
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'ReactJSXRuntime',
          }
        },
      },
    },
  }
})
