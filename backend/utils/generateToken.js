import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const generateToken = (username , res) => {
    var token = jwt.sign({ username : username }, 'secretKey');
    res.cookie('jwt' , token , {
        httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
      sameSite: 'strict'
    })
}

export default generateToken;