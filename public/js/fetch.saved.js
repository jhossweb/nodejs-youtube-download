const form = document.querySelector(".w-full")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
            
    let formData = Object.fromEntries( new FormData(e.target) )
    const response = await fetch('/api/download', { 
            method: 'POST',
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
    })
    
    const url = await response.json()
    if(response.ok) {
        document.getElementById('miModal')
                .classList.remove('hidden');

        const downloadLink = document.getElementById("downloadLink")
        
        downloadLink.href = `/api/download?url=${url}`
        downloadLink.download = `${url}`
        

        console.log(downloadLink)
    }
    
})

