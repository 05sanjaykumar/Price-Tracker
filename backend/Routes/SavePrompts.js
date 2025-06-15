//backend/Routes/SavePrompts.js

const express = require('express')
const router = express.Router()
const {savePrompt, getPromptsByUser} = require('../Controllers/PromptController')

router.post('/', savePrompt);              // Save a prompt
router.get('/:userId', getPromptsByUser);  // Get all prompts for a user

module.exports = router