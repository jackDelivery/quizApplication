const express = require("express");
const { registerUser, login, allProfiles, getUser, updateProfile, forgetPassword, resetPassword, loginAdmin, updateScorrer, inCrementScorrer, deCreamentScorrer, deleteUser, Unloacked, VerifiedEmail, unLockedData } = require("../controllers/userController");
const { profilePhotoResize, profilePhotoUpload } = require("../middleware/UploadImages");
const { authMiddleware, isAdmin } = require("../middleware/authMidlleware");
const router = express.Router();




// register
router.route("/register").post(profilePhotoUpload.single("image"), profilePhotoResize, registerUser);

// login
router.route("/login").post(login);

// verify
router.route("/verify").post(VerifiedEmail);

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

// delete user
router.route("/delete/user:/id").delete(authMiddleware, isAdmin, deleteUser);


// update unlocked
router.route("/updateunlocked").put(authMiddleware, Unloacked)


// new unlocked data
router.route("/unlocked").put(authMiddleware, unLockedData)



module.exports = router;




