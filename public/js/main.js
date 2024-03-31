import { hiddenModalProgress, showModalProgress } from './events/modal.progress.js'
import { showModalDownload } from './events/modal.download.js'


import { FetchSaved } from './fetch/fetch-saved.js'
const fetchSaved = new FetchSaved

const progressBar = document.getElementById("progressBar");

const form = document.querySelector(".w-full")
    .addEventListener("submit", async (e) => {
        e.preventDefault()

        showModalProgress()
        let formData = Object.fromEntries( new FormData(e.target) )
        const url = await fetchSaved.download(formData)
        
        if(url) {
            hiddenModalProgress()
            showModalDownload(url)
        }
        
    })