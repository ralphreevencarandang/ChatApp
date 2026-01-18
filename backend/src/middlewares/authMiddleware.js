import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js';
export const protectRoute = async (req, res, next)=>{
    try {
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({success: false, message: "Unauthorized. No token provided"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(401).json({success: false, message: "Not Authorized"})
        }
        // Select the all info of user but not the password
        const user = await User.findById(decodedToken.id).select("-password")

        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }
  
        // assign the user in the req user
        req.user = user
        next()
    } catch (error) {
        console.log('Error in protect route middleware', error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}