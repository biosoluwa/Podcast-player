import express from 'express'
import { searchRoute } from './router/searchRoute.js'


const app = express()
const PORT = 8000

app.use(express.static('public'))

app.use('/api', searchRoute)

app.listen(PORT, ()=> console.log('Server listening on PORT: ', PORT))

