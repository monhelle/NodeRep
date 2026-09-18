const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    email: String,
    passord: String
})

module.exports = mongoose.model("User", userSchema);