import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const podcastIndexApi = require('podcast-index-api')

const api = podcastIndexApi(
    process.env.PODCAST_INDEX_KEY,
    process.env.PODCAST_INDEX_SECRET,
    'my-app/1.0 (https://example.com)'
)



const app = express()
const PORT = 8000

app.use(express.static('public'))

app.listen(PORT, ()=> console.log('Server listening on PORT: ', PORT))

