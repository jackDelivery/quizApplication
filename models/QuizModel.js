const mongoose = require("mongoose");
const { Schema } = mongoose;


const QuizSchema = new Schema({
    level: {
        type: String,
        required: true,
        trim: true
    },

    isLoacked: {
        type: String,
        default: true
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    }
},
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }

)


const QuizModel = mongoose.model("QUIZ",QuizSchema);


module.exports = { QuizModel };