import express from 'express'
import ytdl from 'ytdl-core'
import fs from 'node:fs/promises'
import { createWriteStream } from 'fs'

const videoUrl = "https://www.youtube.com/watch?v=jhvfYsYQXkc&pp=ygUTdmlkZW9zIGRlIHVuIG1pbnV0bw%3D%3D"

const dowloand = async () => {
    const info = await ytdl.getInfo(videoUrl)
    const videoStream = ytdl(videoUrl, { quality: 'highest', filter: "videoandaudio" })

    videoStream.pipe(createWriteStream('/home/jhossweb/Vídeos/video.mp4'))
}

dowloand()