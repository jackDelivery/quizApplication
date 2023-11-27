const mongoose = require("mongoose");
const { Schema } = mongoose;



const MypdfSchema = new Schema({
    pdf: {
        type: String,
        required: true,
    },
    PdfuploadedAt: {
        type: Date,
        default: Date.now,
    },
});




const MyPdfModel = mongoose.model("MyPdfDetails", MypdfSchema);

module.exports = { MyPdfModel }