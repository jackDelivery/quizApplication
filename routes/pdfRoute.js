const express = require("express");
const { createPdf, getFile } = require('../controllers/pdfController');
const { Upload } = require("../middleware/UploadImages");
const router = express.Router();




// Assuming Upload middleware handles PDF uploads and profilePhotoUpload handles image uploads
router.route("/createupload").post(
  createPdf
);


router.route("/file").get(getFile)

module.exports = router;
