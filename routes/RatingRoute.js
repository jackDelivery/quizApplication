const express = require("express");
const router = express.Router();
const { CreateRating, getAllRating, getSingleRating, deleteSingleRating } = require("../controllers/RatingController");
const { authMiddleware, isAdmin } = require("../middleware/authMidlleware")


router.route("/rating").post(authMiddleware, CreateRating)
router.route("/rating").get(authMiddleware, isAdmin, getAllRating)
router.route("/rating/:id").get(authMiddleware, isAdmin, getSingleRating)
router.route("/rating/:id").delete(authMiddleware, isAdmin, deleteSingleRating)



module.exports = router;