import express from 'express'
import { signin, signup, logout, updateProfile, checkAuth } from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/signup',signup )
router.post('/signin',signin )
router.post('/logout',logout )
router.put('/update-profile',protectRoute,updateProfile )
router.get('/check-auth',protectRoute,checkAuth )




export default router;