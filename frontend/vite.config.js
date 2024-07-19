import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

exports.default  = series(scssTask, jsTask, browserSyncServe, watchTask);

exports.build = series(scssTask, jsTask);
