const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/UserModel");
const generateToken = require("../config/Token");
const CloudinaryCloud = require("./utils/CloudinaryCloud");
const sendEmail = require("./utils/SendEmail");
const bcryptjs = require("bcryptjs");
const generateRefreshToken = require("../config/RefreshToken");
const { sendVerificationEmail } = require("./utils/VerificationEmail");
const { VerificationEmail } = require("./utils/VerifyEmail");

// register

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, dob } = req.body;
  function generateVerificationCode() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const verificationToken = generateVerificationCode();


  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Upload image to Cloudinary

    const localPath = `public/images/profile/${req.file.filename}`;

    let imgUploaded = await CloudinaryCloud(localPath);

    let message = `Welcome ${email} Ebook Quiz`;

    const newUser = new UserModel({
      username,
      email,
      password,
      dob,
      profilePhoto: imgUploaded?.url,
      verificationToken
    });

    // Save user to the database
    await newUser.save();

    await sendEmail({
      email: email,
      subject: "Ebook Quiz Register",
      message,
    });

    await sendVerificationEmail(email, verificationToken, newUser.username)
    // Respond with a success message and user ID
    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.', userId: newUser._id });
  } catch (error) {
    console.error('Error in Register API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Verified
const VerifiedEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;
  try {
    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ error: 'Invalid verification token.' });
    }

    // Update the user's status to verified
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    await VerificationEmail(user?.email)

    res.json({ message: 'Email verification successful.' });
  } catch (error) {
    console.error('Error in Verify API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



// login here

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const message = "Welcome Login System";
  const user = await UserModel.findOne({ email });
  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("All Fields are Required");
    }

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    if (user && (await user.isPasswordmatch(password))) {
      const userData = {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
        dob: user?.dob,
        profilePhoto: user?.profilePhoto,
        role: user?.role,
        token: generateToken(user?._id),
      };

      res.json(userData);
    } else {
      res.status(401).send("Invalid Login Credentials")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error logging in' });
  }

  if (user && (await user.isPasswordmatch(password))) {
    await sendEmail({
      email: user?.email,
      subject: "Ebook Quiz Login",
      message,
    });
  }  // Move the sendEmail() call outside of the try block

});


// all profiles

const allProfiles = asyncHandler(async (req, res) => {
  try {
    let user = await UserModel.find({}).populate("unlocked");

    if (!user) {
      res.status(200).send("Users not found");
    }

    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({ message: 'Error logging in' });
  }
})


// get user

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

    let user = await UserModel.findById(id);

    if (!user) {
      res.status(200).send("Users not found");
    }

    res.status(200).send(user)

  } catch (error) {
    res.status(500).send({ message: 'Error logging in' });
  }
})


// update profile here

const updateProfile = asyncHandler(async (req, res) => {
  const { _id } = req?.user;

  try {

    const user = await UserModel.findByIdAndUpdate(
      _id,
      {
        username: req?.body?.username,
        email: req?.body?.email,
        dob: req?.body?.dob,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(user);

  } catch (error) {
    res.status(500).send({ message: 'Error logging in' });
  }
})


function generateOTP() {
  return Math.floor(Math.random() * 1000000) + 100000;
}


// forget password

const forgetPassword = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    // Check if user exists with the provided email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    console.log("otp", otp)
    user.otp = otp;
    user.otpExpirationTime = new Date(Date.now() + 15 * 60 * 1000); // Set OTP expiration time to 15 minutes
    await user.save();

    // Send an email with the OTP to the user
    const message = `Your password reset OTP is ${otp}. This OTP will expire in 15 minutes.`;

    await sendEmail({
      email: user?.email,
      subject: `Password Reset OTP`,
      message
    })

    res.status(200).json({ message: 'OTP sent to your email' });

  } catch (error) {
    res.status(500).send({ message: 'Error logging in' });

  }
})



// reset password

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const newPassword = req.body.newPassword;

    let message = "Your Password has been Reset Go to Login"

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentTime = new Date();
    if (user.otp !== otp || currentTime > user.otpExpirationTime) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpirationTime = null;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
    await sendEmail({
      email: user?.email,
      subject: "Ebook Quiz Reset",
      message,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error logging in' });
  }
})


// admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  try {
    const findAdmin = await UserModel.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("You are not Admin");
    if (findAdmin && (await findAdmin.isPasswordmatch(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await UserModel.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.json({
        _id: findAdmin?._id,
        username: findAdmin?.username,
        email: findAdmin?.email,
        role: findAdmin?.role,
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});



// increament

const inCrementScorrer = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { incrementValue } = req.body
  try {
    if (!_id || !incrementValue) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the user by ID and increment the scorrer value
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { $inc: { scorrer: incrementValue } },
      { new: true }
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ error: 'User ID and incrementValue are required' });
    }

    // Return the updated user
    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).send(error.message)
  }
})



// decreament

const deCreamentScorrer = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { decrementValue } = req.body
  try {
    if (!_id || !decrementValue) {
      return res.status(400).json({ error: 'User ID and decrementValue are required' });
    }

    // Find the user by ID and increment the scorrer value
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { $inc: { scorrer: -decrementValue } },
      { new: true }
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated user
    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).send(error.message)
  }
})


// Scooer Update

const updateScorrer = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { scorrer } = req.body;
  try {
    const update = await UserModel.findByIdAndUpdate(_id, {
      scorrer: scorrer
    }, { new: true });

    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error.message)
  }
})



// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await UserModel.findByIdAndDelete(id);

    if (!data) {
      return res.status(400).send("User Not Found");
    }

    res.status(200).send("User Deleted")
  } catch (error) {
    res.status(500).send(error.message)
  }
})



// update unlocked
const Unloacked = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { newString } = req.body;
  try {
    // Find the document by ID
    const document = await UserModel.findById(_id);

    // Update the "unlocked" array by adding the new string
    document.unlocked.push(newString);

    // Save the updated document
    const updatedDocument = await document.save();

    res.status(200).json(updatedDocument);

  } catch (error) {
    res.status(500).send(error.message);
  }
});


// new updated unloacked here
const unLockedData = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { unlocked } = req.body;

    // Find the user by ID
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update unlocked entries for the user
    user.unlocked = unlocked;

    // Save the user with the updated unlocked field
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})






module.exports = { registerUser, login, allProfiles, getUser, updateProfile, forgetPassword, resetPassword, loginAdmin, updateScorrer, inCrementScorrer, deCreamentScorrer, deleteUser, Unloacked, VerifiedEmail, unLockedData }