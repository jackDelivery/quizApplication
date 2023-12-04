const mongoose = require('mongoose');
const { Schema } = mongoose;



const quizSchema = new Schema({
    title: String,
    description: String,
    questions: [{ text: String, answers: [String], correctAnswer: Number }],
})



const quizModel = mongoose.model("TESTINGsCHEMA", quizSchema);


module.exports = { quizModel };

