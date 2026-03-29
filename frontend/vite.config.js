import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: true, // Necessary for Docker to map the port externally
    port: 5173, // Ensure this matches your Dockerfile/Compose EXPOSE ports
    watch: {
      usePolling: true, // Enables hot reload in Docker/WSL environments
    },
  },
})
