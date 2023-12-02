const asyncHandler = require("express-async-handler");
const { QuizModel } = require("../models/QuizModel");
const CloudinaryCloud = require("./utils/CloudinaryCloud");



// createQuiz 
const createQuiz = asyncHandler(async (req, res) => {
    const { level, isLoacked } = req.body;
    try {

        const existingQuiz = await QuizModel.findOne({ level });
        if (existingQuiz) {
          return res.status(400).json({ error: 'Level already exists' });
        }

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


// get quiz
const getAllQuiz = asyncHandler(async (req, res) => {
    try {
        const data = await QuizModel.find({});

        if (!data) {
            return res.status(400).send("Data not Found");
        }

        res.status(200).send(data);

    } catch (error) {
        res.status(500).send(error.message)
    }
})



// get find id
const getquizid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        let data = await QuizModel.findById(id);

        if (!data) {
            return res.status(400).send("Data not Found");
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
})



module.exports = { createQuiz, getAllQuiz,getquizid}