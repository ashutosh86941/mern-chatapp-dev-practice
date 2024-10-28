import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const signup = async (req,res) => {
    const {fullname , username, password,confirmPassword, gender} = req.body;

    if(confirmPassword !== password) return res.status(400).json({message: "Passwords do not match"});
    
    const user = await User.findOne({username});
    if(user) return res.status(400).json({message: "User already exists"});

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    //hashPassword
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            // Store hash in your password DB.

            const newUser = new User({
                fullname,
                username,
                password : hash,
                confirmPassword,
                gender,
                profilePic : gender === "male" ? boyProfilePic : girlProfilePic
            });

            try{
                const savedUser = await newUser.save(); 
                console.log("done");
                res.status(201).json(savedUser);
             }
             catch(err){
                 console.log(err);
                 res.status(500).json({message: "Error creating user"});
             }
        });
    });
       // generate jwt token
       generateToken(username , res); 
}


export const login = async (req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user) return res.status(400).json({message: "User does not exist"});
    
    await bcrypt.compare(password, user.password, function(err, result){
        // result == true
        if(!result) return res.status(400).json({message : "something wrong"});
        generateToken(username , res);
        res.send("logged in successfully");
    });
}


export const logout = (req,res) => {
    res.cookie('jwt' , "");
    res.status(200).json({message : "logged out successfully"});
}

