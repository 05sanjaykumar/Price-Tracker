// backend/Controllers/PromptController.js

const UserPrompt = require('../Schemas/PromptSchema');

const savePrompt = async (req, res) => {
  try {
    const { userId, prompt, response } = req.body;

    const newPrompt = new UserPrompt({
      userId,
      prompt,
      response,
    });

    await newPrompt.save();
    res.status(201).json({ message: "Prompt saved successfully!" });
  } catch (error) {
    console.error("Error saving prompt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {savePrompt}