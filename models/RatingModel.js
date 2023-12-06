const mongoose = require("mongoose");
const { Schema } = mongoose;


const RatingSchema = new Schema({
    userId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const RatingModel = mongoose.model("RATING", RatingSchema);


module.exports = { RatingModel }
