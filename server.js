import express from 'express'
import dotenv from 'dotenv'
import podcastIndexApi from 'podcast-index-api'
import { searchRoute } from './router/searchRoute.js'

dotenv.config()

const app = express()
const PORT = 8000

app.use(express.static('public'))

const api = podcastIndexApi(
    process.env.PODCAST_INDEX_KEY,
    process.env.PODCAST_INDEX_SECRET,
    'podcast-player/1.0'
)

app.use('/api', searchRoute)

app.listen(PORT, ()=> console.log('Server listening on PORT: ', PORT))

