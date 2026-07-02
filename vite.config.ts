import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Vite plugin to save CV data locally
const saveCvDataPlugin = () => ({
  name: 'save-cv-data',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/save-cv' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
          body += chunk.toString()
        })
        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            // Generate the TS file content
            const fileContent = `export const defaultCvData = ${JSON.stringify(data, null, 2)};\n\nexport type CVData = typeof defaultCvData;\n`
            
            // Write it to src/data/cvData.ts
            const filePath = path.resolve(__dirname, 'src/data/cvData.ts')
            fs.writeFileSync(filePath, fileContent, 'utf-8')
            
            res.statusCode = 200
            res.end(JSON.stringify({ success: true, message: 'Saved successfully' }))
          } catch (err) {
            console.error('Error saving CV data:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ success: false, message: 'Failed to save' }))
          }
        })
      } else {
        next()
      }
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), saveCvDataPlugin()],
})
