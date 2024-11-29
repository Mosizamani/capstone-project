import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Proxy all requests starting with '/api' to your backend running on localhost:5000
  //     '/': 'http://localhost:4001', // Adjust if your backend runs on a different port
  //   },
  // },
})
