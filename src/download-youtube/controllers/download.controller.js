import ytdl from 'ytdl-core'
import { createWriteStream } from 'fs'

export class DownloadController
{
    async download (req, res) {
        
        const { url, format, quality } = req.body
        const info = await ytdl.getInfo(url)
        
        const title = info.videoDetails.title
        
        const videoStream = ytdl(url, { quality, format, filter: "videoandaudio" })
        
        const videoDownload = videoStream.pipe(createWriteStream(`/home/jhossweb/Vídeos/${title}.${format}`))

        if(videoDownload) {
            console.log("video descargado")
        }

        return res.redirect("/")
    }
}