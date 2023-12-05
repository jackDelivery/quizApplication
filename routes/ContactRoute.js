const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMidlleware");
const { createContact, alldata, getIdData, deleteContact } = require("../controllers/ContactController");




// create contact
router.route("/contact").post(authMiddleware, createContact)

// all contact
router.route("/contact").get(authMiddleware, isAdmin, alldata)


// get contact
router.route("/contact/:id").get(authMiddleware, isAdmin, getIdData);

// delete contact
router.route("/contact/:id").delete(authMiddleware, isAdmin, deleteContact)





module.exports = router
