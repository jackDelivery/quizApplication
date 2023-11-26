const express = require("express");
const { createPdf } = require('../controllers/pdfController');
const { Upload, pdfPhotoResize, pdfPhotoUpload } = require("../middleware/UploadImages");
const router = express.Router();



router.route("/createupload").post(Upload.single('file'), pdfPhotoUpload.single("image"), pdfPhotoResize, createPdf)




module.exports = router