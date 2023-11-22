const express = require("express");
const { registerUser, login, allProfiles, getUser,updateProfile,forgetPassword,resetPassword} = require("../controllers/userController");
const { profilePhotoResize, profilePhotoUpload } = require("../middleware/UploadImages");
const authMiddleware = require("../middleware/authMidlleware");
const router = express.Router();




// register
router.route("/register").post(profilePhotoUpload.single("image"), profilePhotoResize, registerUser);

// login
router.route("/login").post(login);

// all users
router.route("/allusers").get(authMiddleware, allProfiles);

// get user
router.route("/user/:id").get(authMiddleware, getUser);

// update profile
router.route("/user").put(authMiddleware, updateProfile);

// forgetpassword
router.route("/forgetpassword").post(forgetPassword)

// reset password
router.route("/resetpassword").post(resetPassword)

module.exports = router;




