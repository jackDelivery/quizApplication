const express = require("express");
const router = express.Router();
const { createQuestion,getAllQuestions,getIdQuestion } = require("../controllers/QuestionController");
const { authMiddleware, isAdmin } = require("../middleware/authMidlleware");

// create
router.route("/createquestion").post(authMiddleware, isAdmin, createQuestion)

// get all
router.route("/questions").get(authMiddleware,getAllQuestions)

// get id
router.route("/questions/:id").get(authMiddleware,getIdQuestion)

module.exports = router;