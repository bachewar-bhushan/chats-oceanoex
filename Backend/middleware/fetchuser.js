import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/userModel.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
console.log("fetchuser", JWT_SECRET)
const fetchuser = async (req, res, next) => {
    try {
        const token = req.header('authtoken');

        if(!token){
            return res.status(401).json({error : "No token provided"});
        }

        const data = jwt.verify(token, JWT_SECRET);
        
        if(!data){
            return res.status(401).json({error : "Invalid token"});
        }

        const user = await User.findById(data.id).select("-password");

        if(!user){
            return res.status(404).json({error : "User not found"});
        }        

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

export default fetchuser;