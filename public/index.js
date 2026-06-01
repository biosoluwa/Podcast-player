const form = document.querySelector('form')

form.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const searchInput = document.getElementById('search-input')
    if(searchInput.value){
        try{
            const res = await fetch(`/api/search?q=${searchInput.value}`)
            if(!res.ok){
                throw new Error('Error getting podcast')
            }
            const data = await res.json()
            console.log(data)
            renderPodcasts(data)
        }catch(err){
            console.error(err)
        }
    }
})

function renderPodcasts(podObj){
    const podcasts = podObj.feeds
    const container = document.getElementById('container')
    container.innerHTML = podcasts.map((podcast)=>{
        
      return  `
            <div class="card">
                <div class="card-image">
                    <img data-src="${podcast.image}" src="${podcast.image}" alt="podcast image" />
                </div>
                <div>
                    <h2>${podcast.title}</h2>
                    <p>${podcast.description}</p>
                    <p>Episodes: <span> ${podcast.episodeCount} </span></p>
                    <p> Newest Episode: <time datetime="${podcast.newestItemPubdate}"</time></p>
                    <i class="fa-regular fa-star"></i>
                </div>
            </div>
        `
    }).join('')
}