import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:'0.0.0.0',
    port: 5173,
    allowedHosts: true
  }
})

// AllowedHosts: true is used to allow requests from any host, which is useful when running the development server in a container or on a network where the hostname may not be known in advance.