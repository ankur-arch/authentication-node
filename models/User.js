const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default: "student",
  },
  password: String,
  resetPasswordToken: String,
});

/**
 * This function is called just before our user collection is saved on the database
 * The purpose of this is to hash the password before saving it to the database
 */
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.resetPasswordToken = await bcrypt.hash(hashedPassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log("fired");
    console.log("the password", this.password);
    this.password = hashedPassword;
    this.resetPasswordToken = await bcrypt.hash(hashedPassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * This method is called to compare the encrypted password on our server
 * @param {string} password The password the user enters in the form
 */
userSchema.methods.passwordValidator = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
