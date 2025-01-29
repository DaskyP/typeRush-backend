const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wpm: { type: Number, required: true },  
  accuracy: { type: Number, required: true },  
  mode: { type: String, enum: ['time', 'words', 'quotes'], required: true }, 
  subMode: { type: String, required: true },  
  raw: { type: Number, required: true }, 
  characters: {  
    correct: { type: Number, required: true },
    incorrect: { type: Number, required: true },
    omitted: { type: Number, required: true },
    extra: { type: Number, required: true }
  },
  consistency: { type: Number, required: true }, 
  timeTaken: { type: Number, required: true },  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);
