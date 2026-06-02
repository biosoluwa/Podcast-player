const form = document.querySelector('form')
let container = document.getElementById('container')
let errorMsg = document.getElementById('error')
const animationContainer = document.querySelector('.animation-container')

const searchTerms = document.getElementById('search-terms')
const searchHistory = document.getElementById('search-history')

let searchArray = []




form.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const searchInput = document.getElementById('search-input')
    if(searchInput.value){
        searchArray.push(searchInput.value)
        animationContainer.style.display = 'block'
        errorMsg.style.display = 'none'
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
        }finally{
            animationContainer.style.display = 'none'
        }
    }
})

function renderPodcasts(podObj){
    const podcasts = podObj.feeds
    container.innerHTML = podcasts.map((podcast)=>{
        
      return  `
            <div class="card" data-id="${podcast.id}">
                <div class="card-image">
                    <img data-src="${podcast.image}" src="${podcast.image}" alt="podcast image" />
                </div>
                <div class="card-description">
                    <h2>${podcast.title}</h2>
                    <p class="description">${podcast.description}</p>
                    <p class="episodes">Episodes: <span> ${podcast.episodeCount} </span></p>
                    <p class="newest-episode"> Newest Episode: <time datetime="${podcast.newestItemPubdate}"</time></p>
                    <i class="fa-regular fa-star"></i>
                </div>
            </div>
        `
    }).join('')
}



searchHistory.addEventListener('click', function(){
    if(searchArray.length === 0) return 

     let history = ''
    searchArray.forEach(search=>{
        history += `
                <p>${search}</p>
        
        `
    })
    searchTerms.innerHTML = history

    searchTerms.classList.toggle('hide')
})

searchTerms.addEventListener('click', async function(e){
    const text 
    if(e.target.tagName === 'P'){
        text = e.target.textContent
    }
     animationContainer.style.display = 'block'
        errorMsg.style.display = 'none'
        try{
            const res = await fetch(`/api/search?q=${text}`)
            if(!res.ok){
                throw new Error('Error getting podcast')
            }
            const data = await res.json()
            console.log(data)
            renderPodcasts(data)
        }catch(err){
            console.error(err)
        }finally{
            animationContainer.style.display = 'none'
        }
})

document.getElementById('clear-btn').addEventListener('click', function(){
    searchArray = []
    searchTerms.innerHTML = ''
})

container.addEventListener('click', async function(e){
    let id = 0
    if(e.target.closest('.card-description')){
        console.log(e.target.closest('.card').dataset.id)
        id = e.target.closest('.card').dataset.id
    }

    try{
        const res = await fetch (`/api/search?feedId=${id}`)
        const data = await res.json()
        console.log(data)
        renderEpisodes(data)
    }catch(err){
        console.error(err)
    }

})

function renderEpisodes(data){
     const episodes = data.items
    container.innerHTML = episodes.map((episode)=>{
        
      return  `
            <div class="card" data-id="${episode.id}">
                <div class="card-image">
                    <img data-src="${episode.feedImage}" src="${episode.feedImage}" alt="podcast image" />
                </div>
                <div class="card-description">
                    <h2>${episode.description}</h2>
                    <div>
                        <i class="fa-solid fa-play" data-src="${episode.enclosureUrl}" data-img="${episode.feedUrl}" data-title="${episode.title}" data-date="${episode.datePublishedPretty}"></i>
                        <i class="fa-solid fa-list"></>
                        <span>Published: <time datetime="${episode.datePublishedPretty}">${episode.datePublishedPretty}</time></span>
                    </div>
                    <p class="description">${episode.title}</p>
                </div>
            </div>
        `
    }).join('')

}