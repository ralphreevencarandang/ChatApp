import toast from "react-hot-toast";
import axios from '../lib/axios'
import { useAuthStore } from "../store/useAuthStore";
export const checkAuth = async ()=>{
    try {
        const res = await axios.get(`/auth/check-auth`); 
        res.data.success && useAuthStore.getState().setAuthUser(res.data.user)
        console.log(res.data);
        
               
    } catch (error) {
        console.log('Error in check auth function', error);
        console.log(error.response.data.success);
    }
}


