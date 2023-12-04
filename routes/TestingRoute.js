const express = require("express");
const router = express.Router();
const { submitQuiz,createQuiz } = require("../controllers/TestingQuiz");
const { authMiddleware } = require("../middleware/authMidlleware");

router.route("/quiz").post(authMiddleware, submitQuiz);
router.route("/Createquiz").post(authMiddleware, createQuiz);









module.exports = router;