import toast from "react-hot-toast";
import axios from '../lib/axios'
import { useAuthStore } from "../store/useAuthStore";

export const checkAuth = async ()=>{
    try {
        const res = await axios.get(`/auth/check-auth`); 
        res.data.success && useAuthStore.getState().setAuthUser(res.data.user)
        useAuthStore.getState().connectSocket()

        return res.data
    } catch (error) {
        console.log('Error in check auth function', error);
        console.log(error.response.data.message);
    }
}

export const login = async(values)=>{
    try {
        const res = await axios.post('/auth/signin', values);
        // res.data.success && useAuthStore.getState().setAuthUser(res.data.user)
        res.data.success && toast.success('Login successfully')
        useAuthStore.getState().connectSocket()

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

export const logout = async ()=>{
    try {
        const res = await axios.post('/auth/logout');
        res.data.success && useAuthStore.getState().setAuthUser(null)
        res.data.success && toast.success('Logout successfully')
        useAuthStore.getState().disconnectSocket()

    } catch (error) {
        console.log('Error in logout function', error);
        toast.error(error.response.data.message)
    }
}

export const updateProfile = async (values)=>{
    try {

        const res = await axios.put('/auth/update-profile', values)
        res.data.success && toast.success('Profile update successfull!')
        
    } catch (error) {
        console.log('Error in updateProfile function', error);
        toast.error(error.response.data.message)
    }
}
