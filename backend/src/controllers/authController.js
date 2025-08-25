import bcrypt  from 'bcryptjs'
import User from '../models/UserModel.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js'
export const signup =  async (req, res)=>{
    const {fullname, email, password, profilePic} = req.body;
    try {
        if(!fullname, !email, !password){
            return res.status(422).json({success: false, message:'Please input all fields'})
        }

        if(password.length < 6){
            return res.status(422).json({success: false, message:'Password must be at least 6 characters'})
        }

        // check if there is a exisitng user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(422).json({success: false, message:'Email already exists'})
        }
        
        // Generate salt
        const salt = await bcrypt.genSalt(10)

        // Pass the password and salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            fullname,
            email,
            password: hashedPassword,
            profilePic
        })
        // Generate Token
        generateToken(user._id, res);
        await user.save();
        res.status(201).json({success: true, message: 'Register Successfully', user})

    } catch (error) {
        console.log('Error in signup controller', error);
        res.status(500).json({success: false, message:'Internal server error'})

        
    }
}


export const signin =  async (req, res)=>{
    const {email, password} = req.body;
    try {

        if(!email || !password){
            return res.status(422).json({success:false, message: "All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({success:false, message: "Invalid Credentials"})
        }

        generateToken(user._id, res)

        res.status(201).json({success: true, message:"Login successfully"})

    } catch (error) {
        console.log('Error in signin controller', error);
        res.status(500).json({success: false, message:'Internal server error'})
        
        
    }
}
export const logout =  (req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true, //prevent XSS attacks cross-site scripting attacls
            secure: process.env.NODE_ENV != 'development' , //
            sameSite: 'strict', //CSRF attacks cross-site request forgery attacks
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        res.status(201).json({success: true, message:"Logout successfully"})

        
    } catch (error) {
        console.log('Error in logout controller', error);
        res.status(500).json({success: false, message:'Internal server error'})
    }
}


export const updateProfile = async (req, res)=>{
    try {
        const {profilePic} = req.body
        // since protected route, igeget natin yung pinasa nating id sa middleware
        // assign the id into userId
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({success:false, message:"Profile pic is required"})
        }
        if(!userId){
            return res.status(400).json({success:false, message:"No user ID found"})
        }

        // upload the picture in the cloud
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {
            // assign the response sa profile pic
            profilePic: uploadResponse.secure_url
        }, {new: true}); // Ibibigay niya yung updated User

        res.status(200).json({success:true, updatedUser})

    } catch (error) {
        console.log('Error in logout controller', error);
        res.status(500).json({success: false, message:'Internal server error'})
    }
}

export const checkAuth = (req, res)=>{
    try {
        res.status(200).json({success:true, message: "Authenticated", user: req.user})
    } catch (error) {
        console.log('Error in check auth controller', error);
        res.status(500).json({success: false, message:'Internal server error'})
    }
}