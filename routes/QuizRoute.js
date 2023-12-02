const express = require("express");
const router = express.Router();
const { createQuiz } = require("../controllers/QuizController");
const { authMiddleware } = require("../middleware/authMidlleware");
const { profilePhotoUpload, quizPhotoResize } = require("../middleware/UploadImages");


router.route(`/createQuiz`).post(authMiddleware, profilePhotoUpload.single("image"), quizPhotoResize, createQuiz);





module.exports = router;