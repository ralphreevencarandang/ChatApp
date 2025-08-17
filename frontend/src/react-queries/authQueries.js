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
        console.log(error.response.data.message);
    }
}

export const login = async(values)=>{
    try {
        const res = await axios.post('/auth/signin', values);
        res.data.success && useAuthStore.getState().setAuthUser(res.data.user)
        res.data.success && toast.success('Login successfully')
    } catch (error) {
        console.log('Error in sign up function', error);
        toast.error(error.response.data.message)
    }
}

export const signup = async (values)=>{
    try {

        const res = await axios.post('/auth/signup', values);
        res.data.success && useAuthStore.getState().setAuthUser(res.data.user)
        res.data.success && toast.success('Account created successfully')
        
    } catch (error) {
        console.log('Error in sign up function', error);
        toast.error(error.response.data.message)
    }
}

