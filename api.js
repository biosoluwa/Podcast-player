import podcastIndexApi from 'podcast-index-api'
import dotenv from 'dotenv'


dotenv.config()


 const api = podcastIndexApi(
    process.env.PODCAST_INDEX_KEY,
    process.env.PODCAST_INDEX_SECRET,
    'podcast-player/1.0'
)

export default api