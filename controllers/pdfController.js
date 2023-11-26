const asyncHandler = require('express-async-handler');
const { PdfModel } = require('../models/pdfModel');
const cloudinary = require("cloudinary");
const CloudinaryCloud = require("../controllers/utils/CloudinaryCloud");


const createPdf = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    const { title } = req.body;
    const filename = req.file.filename;

    const localPath = `public/images/pdfimages/${req.file.filename}`;

    let imgUploaded = await CloudinaryCloud(localPath);

    // Create a new PdfModel instance
    const newPdf = new PdfModel({
      title: title,
      pdf: filename,
      image: imgUploaded?.url
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

module.exports = { createPdf };
