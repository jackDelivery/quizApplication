const asyncHandler = require("express-async-handler");
const { ContactModel } = require("../models/ContactModel");


const createContact = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send("All Fields are required");
    }
    try {
        const data = new ContactModel({
            name: name,
            email: email,
            message: message
        })

        await data.save();

        res.status(201).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})


// all contact data

const alldata = asyncHandler(async (req, res) => {
    try {
        const data = await ContactModel.find({});

        if (!data) {
            return res.status(400).send("Data not found");
        }

        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})


// get id user

const getIdData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await ContactModel.findById(id);

        if (!data) {
            return res.status(400).send("Data not found");
        }

        res.status(200).send(data)

    } catch (error) {
        res.status(500).send(error)
    }
})


// delete user
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {

        const data = await ContactModel.findByIdAndDelete(id)

        res.status(200).send("Contact has been deleted")

    } catch (error) {
        res.status(500).send(error)
    }
})




module.exports = { createContact, alldata, getIdData, deleteContact }