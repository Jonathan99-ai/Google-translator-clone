import dotenv from 'dotenv'
import path from 'node:path'
import express, { Request, Response } from 'express'
import { translate } from './translate.js'

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT ?? 3000

const __dirname = path.resolve()

app.post('/api/translate', async (req: Request, res: Response) => {
  const body = req.body
  
  translate({ fromLanguage: body.from_language, toLanguage: body.to_language, text: body.text })
    .then((result) => {
      if (result === null) return
      res.status(200).json({ text: result })
    })
    .catch(() => { res.status(500).json({ message: 'Server error'}) })
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})