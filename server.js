import express from 'express'
import dotenv from 'dotenv'
import podcastIndexApi from 'podcast-index-api'

dotenv.config()

const app = express()
const PORT = 8000

app.use(express.static('public'))

const api = podcastIndexApi(
    process.env.PODCAST_INDEX_KEY,
    process.env.PODCAST_INDEX_SECRET,
    'podcast-player/1.0'
)

app.get('/api/search', async(req,res)=>{
    try{
        const results = await api.searchByTerm(req.query.q)
        res.json(results)
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }

})

app.listen(PORT, ()=> console.log('Server listening on PORT: ', PORT))

