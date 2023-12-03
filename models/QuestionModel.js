const mongoose = require('mongoose');
const { Schema } = mongoose;


const questionSchema = new Schema({
    level: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (options) => options.length <= 4,
            message: 'Maximum of 4 options allowed'
        }
    },
    answer: {
        type: String,
        required: true
    },
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


);

const Question = mongoose.model('Question', questionSchema);

module.exports = { Question };