const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required."],
    minLength: [5,"Minimum length required for name is 5 characters."],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is Required."],
    unique: [true,"This Email is already used."],
    trim: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid Email.",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is Required."],
    minLength: [6, "Password must contain atleast 6 characters."],
    //maxLength: [20, "Password must contain atmost 20 characters."],
  },
  location: {
    type: String,
    required: [true, "Location is required, please add a location."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user",userSchema);
