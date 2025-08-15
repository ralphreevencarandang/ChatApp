import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersForSidebar = async (req, res)=>{

    try {
        const loggedInUserId = req.user._id;

        if(!loggedInUserId){
            res.status(401).json({success:false, message: "Unauthorized. No userId found"})
        }
        // find all users not equal to sa id ng nakalogin
        // hindi dapat madisplay yung password ng user
        const users = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json({success: true, users})
    } catch (error) {
        console.log('Error in get users for sidebar controller: ', error);
        res.status(500).json({success:false, message: "Internal server error"})
    }
}

export const getMessages = async ()=>{
    try {
        // rename the id 
        const {id:userToChatId} = req.params
        const senderId = req.user._id;

        // find the messages where yung id mo at yung receiver and vice versa
        // bali yung messages lang ng receiver at  sender lang mag d-display
        const messages = await Message.find({
            $or:[
                {senderId: senderId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: senderId},
            ]
        })
        
        res.status(200).json({success:true, messages})
    } catch (error) {
        console.log('Error in get messages controller: ', error);
        res.status(500).json({success:false, message: "Internal server error"})
    }
}

export const sendMessage = async (req, res)=>{
    try {
        const {id:receiverId} = req.params;
        const {text, image} =req.body;
        const senderId = req.user._id;

        // undefined
        let imageUrl;
        // if may laman yung image u-upload n iya sa cloudinary
        if(image){
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            // then assign sa imageurl yung path ng image para pwede siya iget mamaya pag nasa db na siya
            imageUrl = uploadResponse.secure_url;
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            // it will be undefined or acutal value
            image: imageUrl
        })

        await newMessage.save()

        // todo: realtime functionality goes here => socket.io
        res.status(201).json({success: true, message:'Message sent success', newMessage})

    } catch (error) {
        console.log('Error in send message controller: ', error);
        res.status(500).json({success:false, message: "Internal server error"})
    }
}