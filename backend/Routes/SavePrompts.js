//backend/Routes/SavePrompts.js

const express = require('express')
const router = express.Router()
const {savePrompt} = require('../Controllers/PromptController')

router.post('/',savePrompt)

module.exports = router