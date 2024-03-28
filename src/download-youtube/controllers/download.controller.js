import ytdl from 'ytdl-core'
import { createWriteStream } from 'fs'
import { homedir } from 'node:os'

export class DownloadController
{
    _pathSaved = "/home/jhossweb/Vídeos/"

    async getDownload (req, res) {
        try {
            console.log(req.query.url)
            const url = req.query.url
            const path = url.replace("/home/jhossweb/Vídeos/", "")

            const pathLimpio = encodeURIComponent(path)
            console.log(pathLimpio)

            await res.download(`${this._pathSaved}${pathLimpio}`)
        } catch(e) {
            console.log(e.message())
        }
    }

    async download (req, res) {
        
        try {
            const { url, format, quality } = req.body
            const info = await ytdl.getInfo(url)
            
            const title = info.videoDetails.title
            
            const videoStream = ytdl(url, { quality, format, filter: "videoandaudio" })
            const titleSinHashtag = title.replace(/#/g, "").replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g)
            
            const titleLimpio = encodeURIComponent(title)
            const pathVideo = `${titleLimpio}.${format}`
            console.log(titleLimpio)

            res.setHeader('Content-Disposition', `attachment; filename="${titleLimpio}.${format}"`);
            const videoDownload = videoStream.pipe(createWriteStream(`${this._pathSaved}${pathVideo}`))
             
            if(videoDownload) {
                console.log("video descargado")
            }

            
            return res.json(`${this._pathSaved}${pathVideo}`);
        } catch (e) {
            console.error(e.message)
        }
    }
}


 //  // Maneja el progreso de descarga
//  let totalBytes = 0;
//  videoStream.on('data', (chunk) => {
//      totalBytes += chunk.length;
//      let progress = (totalBytes / info.videoDetails.lengthSeconds) * 100;
//      console.log(`Progreso: ${progress.toFixed(2)}%`);
     
//      //Envía el progreso al cliente a través de una respuesta JSON
//      return res.write(JSON.stringify({ progress }));
//   })