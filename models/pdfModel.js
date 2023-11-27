const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;


























// const mongoose = require("mongoose");
// const { Schema } = mongoose;



// const pdfSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         default:
//             "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//     },
//     mypdf: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "MyPdfDetails"
//         }
//     ],
//     uploadedAt: {
//         type: Date,
//         default: Date.now,
//     },
// });




// const PdfModel = mongoose.model("PdfDetails", pdfSchema);

// module.exports = { PdfModel }