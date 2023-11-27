const asyncHandler = require('express-async-handler');
const { MyPdfModel } = require('../models/MyPdfModel');


const MycreatePdf = asyncHandler(async (req, res) => {
    try {
        const mypdf = req.file.filename;

        if (!mypdf) {
            return res.status(400).send('No file uploaded');
        }

        console.log(mypdf)


        // Create a new PdfModel instance
        const newPdf = new MyPdfModel({
            pdf: mypdf,
        });

        // Save the instance to the database
        await newPdf.save();

        res.status(201).json({
            message: 'Your pdf has been successfully uploaded',
            pdfDetails: newPdf,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = {MycreatePdf}