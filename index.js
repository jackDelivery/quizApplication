require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary');
app.use("/files", express.static("files"))


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret
});


const User = require("./routes/userRoute");
const quiz = require("./routes/QuizRoute");
const question = require("./routes/QuestionRoute");
const contact = require("./routes/ContactRoute");
const rating = require("./routes/RatingRoute");


// middleware calling here
app.use(express.json());
app.use(bodyParser.json());  //new line of code
app.use(bodyParser.urlencoded({ extended: false }));  //new line of code
app.use(morgan("tiny"));




// routes calling here
app.use(User);
app.use(quiz);
app.use(question);
app.use(contact);
app.use(rating);


app.get(`/`, (req, res) => {
  res.status(200).send("Hello Quiz");
})

app.use("*", (req, res, next) => {
  res.status(400).send("Page Not Found!");
  next()
})





// database connected
mongoose.connect(process.env.MONGODB).then(() => {
  console.log(`Database Connected!`)
}).catch((err) => console.log(err))



// server start here


app.listen(PORT, () => console.log(`Your Server is Running on ${PORT}`));
