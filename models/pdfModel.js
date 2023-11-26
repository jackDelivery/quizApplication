const mongoose = require("mongoose");
const { Schema } = mongoose;



const pdfSchema = new Schema({
    pdf: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});




const PdfModel = mongoose.model("PdfDetails", pdfSchema);

module.exports = { PdfModel }