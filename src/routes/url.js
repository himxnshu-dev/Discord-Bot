const express = require('express')
const router = express.Router();
const {handleGenerateShortURL} = require('../controllers/url')

router.post('/url', handleGenerateShortURL)

module.exports = router