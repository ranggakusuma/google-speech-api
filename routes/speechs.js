const express = require('express')
const router = express.Router()
const speechController = require('../controller/speechController')

router.post('/', speechController.speech)

module.exports = router