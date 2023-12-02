const express = require("express");
const router = express.Router();
const { createQuiz,getAllQuiz,getquizid } = require("../controllers/QuizController");
const { authMiddleware } = require("../middleware/authMidlleware");
const { profilePhotoUpload, quizPhotoResize } = require("../middleware/UploadImages");


router.route(`/createQuiz`).post(authMiddleware, profilePhotoUpload.single("image"), quizPhotoResize, createQuiz);
router.route("/quiz").get(authMiddleware,getAllQuiz);
router.route("/quiz/:id").get(authMiddleware,getquizid);



module.exports = router;