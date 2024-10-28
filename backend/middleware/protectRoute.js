import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res , next) => {

    try{
    const token  =  req.cookies.jwt;
    if(!token) return res.status(404).json({message : "token not found"});

    const decoded = jwt.verify(token, "secretKey");

    if(!decoded) return res.status(400).json({message: "unauthorized user"});

    const user = await User.findOne({username : decoded.username}).select("-password");

    if(!user) return res.status(404).json({message: "user not found"});
    req.user = user;

    next();

}
catch(error){
    console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
}
}

export default protectRoute;