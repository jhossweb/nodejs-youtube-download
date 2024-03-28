import { closeModal } from "./close.modal.js";


export const showModal = (url) => {
    /* Para que el modal se abra en 10 sg */
    setTimeout( () => { 
        document.getElementById('miModal')
        .classList.remove('hidden'); 
    }, 8000)
    
    /** Boton de Descarga */
    const downloadLink = document.getElementById("downloadLink")
    downloadLink.href = `/api/download?url=${url}`
    downloadLink.download = `${url}`

    /** Cerrar Modal */
    document.getElementById('close-modal')
            .addEventListener('click', closeModal)
}