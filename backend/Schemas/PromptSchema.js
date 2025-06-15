// backend/Schemas/PromptSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromptSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserPrompt', PromptSchema);
