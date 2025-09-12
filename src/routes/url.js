const express = require('express')
const router = express.Router();
const {handleGenerateShortURL, handleGetFromShortURL} = require('../controllers/url')
const {checkAuth} = require('../middlewares/auth')

router.post('/url', checkAuth, handleGenerateShortURL)
router.get('/:shortId', handleGetFromShortURL)

module.exports = router