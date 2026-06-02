import api from '../api.js'

export async function searchController(req,res){
    const {q, feedId} = req.query
        try{
            let results
            if(q){
                    results = await api.searchByTerm(q)
            }else if(feedId){
                results = await api.episodesByFeedId(feedId)
            }else{
                return res.status(400).json({error: "Please provide a search term or feed ID"})
            }
            res.json(results)
        }catch(err){
            console.error(err)
                res.status(500).json({error: "Internal server error"})
        }
    }
