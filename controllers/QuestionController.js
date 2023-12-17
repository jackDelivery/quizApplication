const asyncHandler = require("express-async-handler");
const { Question } = require("../models/QuestionModel");

// create question
const createQuestion = asyncHandler(async (req, res) => {
    const { title, level, id, question, options, answer } = req.body;
    try {
        const data = new Question({
            title: title,
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

        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Question.find(JSON.parse(queryStr));


        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }


        // limiting the fields

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        const data = await query;
        res.json(data);
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




module.exports = { createQuestion, getAllQuestions, getIdQuestion }