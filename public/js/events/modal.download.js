export const showModalDownload = (url) => {
    
    document.getElementById('miModal')
        .classList.remove('hidden'); 
    
    /** Boton de Descarga */
    const downloadLink = document.getElementById("downloadLink")
    downloadLink.href = `/api/download?url=${url}`
    downloadLink.download = `${url}`

    /** Cerrar Modal */
    document.getElementById('close-modal')
            .addEventListener('click', closeModalDownload)
}


const closeModalDownload = () => {
  
    const modal = document.getElementById('miModal')
    modal.classList.add("hidden")

}