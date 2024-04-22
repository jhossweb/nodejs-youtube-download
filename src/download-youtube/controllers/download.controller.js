import ytdl from 'ytdl-core'
import { createWriteStream, write } from 'fs'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export class DownloadController
{
    _pathSaved = process.env.PATH_SAVED
    _dirname = dirname(fileURLToPath(import.meta.url))
    _pathDownload = join(this._dirname, '../../../', this._pathSaved)

    async getDownload (req, res) {
        try {
            
            const url = req.query.url
            const path = this._getPathFromUrl(url)
            
            await res.download(`${this._pathDownload}${path}`)
            
        } catch(e) {
            console.log(e.message)
            res.status(500).json({ err: "Error al descargar Video" })
        }
    }

    async download (req, res) {
        
        try {
            const { url, format, quality } = req.body
            const info = await ytdl.getInfo(url)
            const title = info.videoDetails.title
            const size = info.formats[0].contentLength
            console.log("mostrando el peso desde el controlador", size)                                    
            const titleLimpio = this._sanitizeTitle(title)
            const pathVideo = `${titleLimpio}.${format}`


            
                        
            res.setHeader('Content-Disposition', `attachment; filename="${titleLimpio}.${format}"`);
            const videoDownload = ytdl(url, { quality, format, filter: "videoandaudio" })
            const writeStream = createWriteStream(`${this._pathDownload}${pathVideo}`)
            writeStream.on('data', () => res.json(size))
                        
            if(!videoDownload) return res.status(500).json({ error: "Error al descargar Video" })
            
            return res.status(200).json({ "path": `${this._pathDownload}${pathVideo}`, "size": size});
        } catch (e) {
            console.error(e.message)
            res.status(500).json({ err: "Error al descargar Video" })
        }
    }

    _getPathFromUrl (url) {
        const path = url.replace(this._pathDownload, "")
        const pathLimpio = encodeURIComponent(path)
        
        return pathLimpio
    }

    _sanitizeTitle(title) {
        return encodeURIComponent(title)
    }
}