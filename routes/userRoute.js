const express = require("express");
const { registerUser, login, allProfiles, getUser, updateProfile, forgetPassword, resetPassword, loginAdmin, updateScorrer, inCrementScorrer, deCreamentScorrer, deleteUser } = require("../controllers/userController");
const { profilePhotoResize, profilePhotoUpload } = require("../middleware/UploadImages");
const { authMiddleware, isAdmin } = require("../middleware/authMidlleware");
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

// admin login

router.route("/admin").post(loginAdmin);

// scooer route
router.route("/scorrer").put(authMiddleware, updateScorrer);
router.route("/scorrer/increment").put(authMiddleware, inCrementScorrer);
router.route("/scorrer/decrement").put(authMiddleware, deCreamentScorrer);
router.route("/delete/users").delete(authMiddleware, isAdmin, deleteUser);


module.exports = router;




