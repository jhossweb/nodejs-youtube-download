import { readdir, unlink } from 'node:fs/promises'
import { join } from 'path'

const folder = "/home/jhossweb/Vídeos/youtube-download/"

export const deleteVideos = async () => {
    try {
        
        const files = await readdir(folder)
        const pathCompled = files.map(file => join(folder, file))
        console.log(pathCompled)
        await Promise.all(pathCompled.map(file => unlink(file)))
        console.log("todos los archivos eliminados");

    } catch (error) {
        console.error(error)
    }
}