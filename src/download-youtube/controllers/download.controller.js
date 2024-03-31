import ytdl from 'ytdl-core'
import { createWriteStream } from 'fs'


export class DownloadController
{
    _pathSaved = "/home/jhossweb/Vídeos/youtube-download/"

    async getDownload (req, res) {
        try {
            
            const url = req.query.url
            const path = this._getPathFromUrl(url)

            await res.download(`${this._pathSaved}${path}`)
            
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
                                    
            const titleLimpio = this._sanitizeTitle(title)
            const pathVideo = `${titleLimpio}.${format}`
                        
            res.setHeader('Content-Disposition', `attachment; filename="${titleLimpio}.${format}"`);
            const videoDownload = ytdl(url, { quality, format, filter: "videoandaudio" })                                    
                                    .pipe(createWriteStream(`${this._pathSaved}${pathVideo}`))

            if(!videoDownload) return res.status(500).json({ error: "Error al descargar Video" })

            return res.status(200).json(`${this._pathSaved}${pathVideo}`);
        } catch (e) {
            console.error(e.message)
            res.status(500).json({ err: "Error al descargar Video" })
        }
    }

    _getPathFromUrl (url) {
        const path = url.replace("/home/jhossweb/Vídeos/youtube-download/", "")
        const pathLimpio = encodeURIComponent(path)
        
        return pathLimpio
    }

    _sanitizeTitle(title) {
        return encodeURIComponent(title)
    }
}