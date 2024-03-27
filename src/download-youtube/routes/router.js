import { Router } from 'express'
import { DownloadController } from '../controllers/download.controller.js'

const router = Router()
const downloadController = new DownloadController

router.get('/download', (req, res) => downloadController.getDownload(req, res))
router.post('/download', (req, res) => downloadController.download(req, res))

export { router }