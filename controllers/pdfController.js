const asyncHandler = require('express-async-handler');
const File = require('../models/pdfModel');
// const CloudinaryCloud = require("../controllers/utils/CloudinaryCloud");
const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
// const path = require('path')
// const PDFDocument = require('pdfkit');
// const cloud = require("./pdfClodinary");


// const { CloudinaryStorage } = require('multer-storage-cloudinary');



const createPdf = asyncHandler(async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
})







// const createpdf = asyncHandler(async (req, res) => {
//   try {
//     const { title } = req.body;
//     const pdfPath = req.files.pdf[0].path;
//     const imagePath = req.files.image[0].path;

//     // Upload PDF to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(pdfPath, { resource_type: 'raw' });
//     const pdfUrl = uploadResult?.secure_url;

//     // Upload image to Cloudinary
//     const imageUploadResult = await cloudinary.uploader.upload(imagePath);
//     const thumbnailUrl = imageUploadResult?.secure_url;

//     // Generate thumbnail image


//     // Save PDF and thumbnail URL to MongoDB
//     const newPDF = new File({ title, pdfUrl, thumbnailUrl });
//     await newPDF.save();

//     res.json({
//       message: 'PDF uploaded successfully',
//       data: {
//         title: newPDF.title,
//         pdfUrl: pdfUrl,
//         thumbnailUrl: thumbnailUrl
//       },
//     });
//   } catch (error) {
//     res.status(500).send(error)
//   }

// })






// get files

const getFile = asyncHandler(async (req, res) => {
  try {
    const data = await PdfModel.find({});

    if (!data) {
      return res.status(400).send("No data found")
    }

    res.status(200).send(data);

  } catch (error) {
    res.status(500).send(error)
  }
})


module.exports = { createPdf, getFile };
