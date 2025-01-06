import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
/*   server: {
    https: {
      key: fs.readFileSync("/etc/certificados/privkey.pem"),
      cert: fs.readFileSync("/etc/certificados/fullchain.pem"), 
    },
    host: true,
    port: 5173,
  }, */
})
