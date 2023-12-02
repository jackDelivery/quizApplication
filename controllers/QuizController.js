const asyncHandler = require("express-async-handler");
const { QuizModel } = require("../models/QuizModel");
const CloudinaryCloud = require("./utils/CloudinaryCloud");



// createQuiz 
const createQuiz = asyncHandler(async (req, res) => {
    const { level, isLoacked } = req.body;
    try {

        const localPath = `public/images/quiz/${req.file.filename}`;

        let imgUploaded = await CloudinaryCloud(localPath);

        const createQuizLevel = new QuizModel({
            level: level,
            isLoacked: isLoacked,
            image: imgUploaded?.url
        })

        await createQuizLevel.save();

        res.status(201).json({ message: 'Quiz Created', quiz: createQuizLevel._id });

    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = { createQuiz }