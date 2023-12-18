const express = require("express");
const router = express.Router();
const { createQuiz, getAllQuiz, getquizid, updateQuizLevel } = require("../controllers/QuizController");
const { authMiddleware, isAdmin } = require("../middleware/authMidlleware");
// const { profilePhotoUpload, quizPhotoResize } = require("../middleware/UploadImages");


router.route(`/createQuiz`).post(authMiddleware, isAdmin, createQuiz);
router.route("/quiz").get(authMiddleware, getAllQuiz);
router.route("/quiz/:id").get(authMiddleware, getquizid);
router.route("/quiz/:id").put(authMiddleware, isAdmin, updateQuizLevel);


module.exports = router;