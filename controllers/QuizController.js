const asyncHandler = require("express-async-handler");
const { QuizModel } = require("../models/QuizModel");
const CloudinaryCloud = require("./utils/CloudinaryCloud");



// createQuiz 
const createQuiz = asyncHandler(async (req, res) => {
    const { level, isLoacked } = req.body;
    try {
       

        // const localPath = `public/images/quiz/${req.file.filename}`;

        // let imgUploaded = await CloudinaryCloud(localPath);

        const createQuizLevel = new QuizModel({
            title: req.body.title,
            level: level,
            isLoacked: isLoacked
        })

        await createQuizLevel.save();

        res.status(201).json({ message: 'Quiz Created', quiz: createQuizLevel });

    } catch (error) {
        res.status(500).send(error)
    }
})


// get quiz
const getAllQuiz = asyncHandler(async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = QuizModel.find(JSON.parse(queryStr));


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



// update Quiz level

const updateQuizLevel = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isLoacked } = req.body;
    try {
        const data = await QuizModel.findByIdAndUpdate(id, {
            isLoacked: isLoacked
        }, { new: true })

        res.status(200).json({ message: "isLoacked has been Updated", data: data })

    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = { createQuiz, getAllQuiz, getquizid, updateQuizLevel }