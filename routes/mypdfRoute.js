const express = require("express");
const { MycreatePdf } = require('../controllers/myPdfController');
const {Upload } = require("../middleware/UploadImages");
const router = express.Router();

// Assuming Upload middleware handles PDF uploads and profilePhotoUpload handles image uploads
router.route("/createpdf").post(
  Upload.single('file'), 
  MycreatePdf 
);

module.exports = router;
