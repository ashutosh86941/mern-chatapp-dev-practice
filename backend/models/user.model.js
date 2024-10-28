import mongoose  from "mongoose"

const userSchema = new mongoose.Schema({
    fullname : String,
    username : String,
    password : String,
    gender : String,
    profilePic : String
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;