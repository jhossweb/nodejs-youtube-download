export const showModalProgress = () => {
    document.getElementById('modal-progress')
             .classList.remove('hidden');
            } 
            
export const progress = (size) => {
    console.log("progress", size)
    const progress = document.querySelector("#progressBar")
    //const videoSize = size
    
    let currentProgress = 0
    const interval = setInterval( () => {
        currentProgress += 1
        progress.value = currentProgress
        progress.max = 100
        
        if(currentProgress >= 100) {
            clearInterval(interval)
            hiddenModalProgress()
        }
    }, 1000 )

}

export const hiddenModalProgress = () => {
    document.getElementById('modal-progress')
             .classList.add('hidden');
}