const form = document.querySelector('form')
let container = document.getElementById('container')
let errorMsg = document.getElementById('error')
const animationContainer = document.querySelector('.animation-container')

const searchTerms = document.getElementById('search-terms')

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


function displaySearchHistory(arr){
    let searchHistory = ''
    arr.forEach(search=>{
        searchHistory += `
                <p>${search}</p>
        
        `
    })
    searchTerms.innerHTML = searchHistory
}

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
    }catch(err){
        console.error(err)
    }

})