const express = require("express");
const { createPdf, getFile} = require('../controllers/pdfController');
// const { Upload } = require("../middleware/UploadImages");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: './uploads'
});

const upload = multer({ storage: storage });



// Assuming Upload middleware handles PDF uploads and profilePhotoUpload handles image uploads
router.route("/createupload").post(
  upload.single("pdf"),
  createPdf
);



router.route("/file").get(getFile)


module.exports = router;
