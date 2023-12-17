const { categoryModel } = require("../models/CategoryModel");
const asyncHandler = require("express-async-handler");
const CloudinaryCloud = require("./utils/CloudinaryCloud");


// create Category
const Category = asyncHandler(async (req, res) => {

    const { title } = req.body;
    const localPath = `public/images/category/${req.file.filename}`;

    let imgUploaded = await CloudinaryCloud(localPath);
    console.log(imgUploaded)
    try {

        if (!title) {
            return res.status(400).send("All Fields Required")
        }

        const data = new categoryModel({
            title: title,
            image: imgUploaded?.url
        })

        await data.save();

        res.status(201).send("Category Created")
    } catch (error) {
        res.status(500).send(error)
    }
})


// all category here
const allCategory = asyncHandler(async (req, res) => {
    try {
        const data = await categoryModel.find({});

        if(!data){
            return res.status(400).send("Category not found");
        }

        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

// single category

const SingleCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await categoryModel.findById(id);

        if (!data) {
            return res.status(400).send("Category not found")
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error)
    }
})


// delete category
const DeleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await categoryModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(400).send("Category not found")
        }

        res.status(200).send("Category Deleted");
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = { Category, allCategory, SingleCategory,DeleteCategory }