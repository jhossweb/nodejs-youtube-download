import { showModal } from './events/show.modal.js'
import { FetchSaved } from './fetch/fetch-saved.js'
const fetchSaved = new FetchSaved

const form = document.querySelector(".w-full")
    .addEventListener("submit", async (e) => {
        e.preventDefault()

        let formData = Object.fromEntries( new FormData(e.target) )
        const url = await fetchSaved.download(formData)
        
        if(url) {
            console.log(url)
            showModal(url)
        }
        
    })