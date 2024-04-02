import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'node:url'
import cron from 'node-cron'


import { router } from './download-youtube/routes/router.js'
import { deleteVideos } from './download-youtube/cron-jobs/delete.js'

class AppServer
{
    _port = 4000
    _app = express()
    __dirname = dirname(fileURLToPath(import.meta.url))

    constructor() {
        this.middlewares()
        this._app.use('/api', router)
        
        //this.jobsDelete()
    }

    jobsDelete() {
        cron.schedule('30 18 * * *', deleteVideos)
    }

    middlewares () {
        this._app.use('/', express.static(join(this.__dirname, '../public') ))
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(express.json())
    }

    listen() {
        this._app.listen(this._port)
        console.log(`Server on port: ${this._port}`)
    }
}

const server = new AppServer
server.listen()