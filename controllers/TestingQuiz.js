const asyncHandler = require("express-async-handler");
const { quizModel } = require("../models/TestingQuizModel");

// submit quiz here


const createQuiz = asyncHandler(async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        const newQuiz = new Quiz({
            title,
            description,
            questions,
        });

        newQuiz.save((err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json({ message: 'Quiz created successfully!', quizId: newQuiz._id });
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
})






// Generate unique ID for new submissions
function generateId() {
    return Math.random().toString(36).substring(2, 15);
}


const submitQuiz = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { submittedAnswers } = req.body;
    const id = generateId();
    try {
        const newQuizAttempt = {
            _id,
            isCorrect: submittedAnswers.every((answer, index) => answer === quiz.questions[index].correctAnswer),
            submittedAnswers,
        };

        quizModel.findByIdAndUpdate(id, {
            $push: { userAnswers: newQuizAttempt },
            locked: newQuizAttempt.isCorrect,
        }, { new: true }, (err, quiz) => {
            if (err) {
                res.status(500).json({ error: err });
            } else if (!quiz) {
                // Quiz not found, create a new one with the attempt
                const newQuiz = new quizModel({
                    _id: id,
                    ...req.body,
                    userAnswers: [newQuizAttempt],
                });
                newQuiz.save((saveErr) => {
                    if (saveErr) {
                        res.status(500).json({ error: saveErr });
                    } else {
                        res.json({ message: newQuizAttempt.isCorrect ? 'Quiz unlocked! 🎉' : 'Try again! 🤔' });
                    }
                });
            } else {
                res.json({ message: newQuizAttempt.isCorrect ? 'Quiz unlocked! 🎉' : 'Try again! 🤔' });
            }
        });

    } catch (error) {

    }
})



module.exports = { submitQuiz,createQuiz }