const mongoose = require("mongoose");
const { Schema } = mongoose;


const ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    }
})


const ContactModel = mongoose.model("CONTACT",ContactSchema);

module.exports = {ContactModel};