export const showModalProgress = () => {
    document.getElementById('modal-progress')
             .classList.remove('hidden');
} 


export const hiddenModalProgress = () => {
    document.getElementById('modal-progress')
             .classList.add('hidden');
}