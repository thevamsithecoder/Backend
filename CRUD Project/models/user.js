const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : [true, "Please add the user name"]
    },
    email : {
        type : String,
        required : [true, "Please add the user email address"],
        unique : [true, "Email address already exist"]
    },
    password : {
        type : String,
        required : [true, "Please add the user password"]
    }
}, {
    timestamps : true
   }
)

const User = mongoose.model("User", userSchema);


module.exports = User;