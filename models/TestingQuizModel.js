const mongoose = require('mongoose');
const { Schema } = mongoose;



const quizSchema = new Schema({
    title: String,
    description: String,
    questions: [{ text: String, answers: [String], correctAnswer: Number }],
    locked: { type: Boolean, default: true },
    userAnswers: [], // Array of user attempts per user ID
})



const quizModel = mongoose.model("TESTINGsCHEMA", quizSchema);


module.exports = { quizModel };

