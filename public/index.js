const form = document.querySelector('form')

form.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const searchInput = document.getElementById('search-input')
    if(searchInput.value){
        const res = await fetch(`/api/search?q=${searchInput.value}`)
        const data = await res.json()
        console.log(data)
    }
})