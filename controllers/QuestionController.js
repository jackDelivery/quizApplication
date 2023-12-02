const asyncHandler = require("express-async-handler");
const { Question } = require("../models/QuestionModel");

// create question
const createQuestion = asyncHandler(async (req, res) => {
    const { level, id, question, options, answer } = req.body;
    try {
        const existingQuiz = await Question.findOne({ level });
        if (existingQuiz) {
            return res.status(400).json({ error: 'Level already exists' });
        }

        const data = new Question({
            level: level,
            id: id,
            question: question,
            options: options,
            answer: answer
        })

        await data.save();

        res.status(201).json({ message: "Question Created", data: data?._id })

    } catch (error) {
        res.status(500).send(error?.message);
    }
})


// update question


// get all question

const getAllQuestions = asyncHandler(async (req, res) => {
    try {
        const data = await Question.find({});

        if (!data) {
            return res.status(400).send("Question not found")
        }

        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})


// get per id question

const getIdQuestion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Question.findById(id);

        if (!data) {
            return res.status(400).send("Question not found")
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error?.message)
    }
})


// delete question




module.exports = { createQuestion, getAllQuestions,getIdQuestion }