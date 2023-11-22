const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    dob: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },

    otp: { type: String },
    otpExpirationTime: { type: Date },
    passwordChangeAt: Date,

},
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
)


// secure the password here

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// match password
userSchema.methods.isPasswordmatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };