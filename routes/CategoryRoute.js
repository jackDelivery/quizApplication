const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMidlleware");
const { Category,allCategory,SingleCategory,DeleteCategory } = require("../controllers/CategoryController");
const { categoryPhotoResize, profilePhotoUpload } = require("../middleware/UploadImages")


router.route("/category").post(authMiddleware, isAdmin, profilePhotoUpload.single("image"), categoryPhotoResize, Category);


router.route("/category").get(authMiddleware,allCategory);
router.route("/category/:id").get(authMiddleware,SingleCategory);
router.route("/category/:id").delete(authMiddleware,DeleteCategory);



module.exports = router;