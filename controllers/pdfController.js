const asyncHandler = require('express-async-handler');
const File = require('../models/pdfModel');
// const CloudinaryCloud = require("../controllers/utils/CloudinaryCloud");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path')
const PDFDocument = require('pdfkit');
const cloud = require("./pdfClodinary");

// const { CloudinaryStorage } = require('multer-storage-cloudinary');



const createPdf = asyncHandler(async (req, res) => {
  try {
    const filename = req.body.filename;
    const pdfPath = path.join('data', 'pdf', filename + '.pdf')
    const pdfDoc = new PDFDocument()

    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '" ')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/pdf')
    res.status(201)
    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    await pdfDoc.pipe(res);
    const content = await req.body.content
    pdfDoc.text(content)

    cloud.uploads(pdfPath).then((result) => {
      const pdfFile = {
        pdfName: filename,
        pdfUrl: result.url,
        pdfId: result.id
      }
      console.log('pdf results--', pdfFile.pdfUrl)
    })
    pdfDoc.end();
  } catch (error) {
    res.status(400).json({ message: 'An error occured in process' });
  }
})


















// const createpdf = asyncHandler(async (req, res) => {
//   try {
//     const { title } = req.body;
//     const pdfPath = req.files.pdf[0].path;
//     const imagePath = req.files.image[0].path;

//     // Upload PDF to Cloudinary
//     const pdfUploadResult = await cloudinary.uploader.upload(pdfPath, {
//       resource_type: "raw",
//       format: 'pdf',
//     });
//     const pdfUrl = pdfUploadResult?.secure_url;

//     // Upload image to Cloudinary
//     const imageUploadResult = await cloudinary.uploader.upload(imagePath);
//     const thumbnailUrl = imageUploadResult?.secure_url;

//     // Save PDF and thumbnail URL to MongoDB
//     const newPDF = new File({ title, pdfUrl, thumbnailUrl });
//     await newPDF.save();

//     res.json({
//       message: 'PDF uploaded successfully',
//       data: {
//         title: newPDF.title,
//         pdfUrl: pdfUrl,
//         thumbnailUrl: thumbnailUrl,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

















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
