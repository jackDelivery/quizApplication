const mongoose = require("mongoose");
const { Schema } = mongoose;



const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
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

)


const categoryModel = mongoose.model("category", categorySchema);


module.exports = { categoryModel }