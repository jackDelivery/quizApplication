const asyncHandler = require("express-async-handler");
const { RatingModel } = require("../models/RatingModel");



// create rating

const CreateRating = asyncHandler(async (req, res) => {
    const { userId, message, rating } = req.body;
    if (!userId || !message || !rating) {
        return res.status(400).send("All Field Required")
    }
    try {
        const createrating = new RatingModel({
            userId: userId,
            message: message,
            rating: rating
        })

        await createrating.save();

        res.status(201).send("Rating Created")

    } catch (error) {
        res.status(500).send(error)
    }
})


// get ratings

const getAllRating = asyncHandler(async (req, res) => {
    try {
        const data = await RatingModel.find({}).populate("userId", "-password -otp -otpExpirationTime -admin -refreshToken -unlocked -scorrer");

        if (!data) {
            return res.status(400).send("Rating Not Found")
        }

        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})


// single rating
const getSingleRating = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const singlerating = await RatingModel.findById(id).populate("userId", "-password -otp -otpExpirationTime -admin -refreshToken -unlocked -scorrer");;

        if (!singlerating) {
            return res.status(400).send("Rating Not Found");
        }

        res.status(200).send(singlerating);
    } catch (error) {
        res.status(500).send(error)
    }
})


// delete rating
const deleteSingleRating = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const singlerating = await RatingModel.findByIdAndDelete(id);

        if (!singlerating) {
            return res.status(400).send("Rating Not Found");
        }

        res.status(200).send("Rating Deleted");
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = { CreateRating, getAllRating, getSingleRating, deleteSingleRating }