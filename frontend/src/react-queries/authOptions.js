import { mutationOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { checkAuth, signup, login, logout, updateProfile } from "./authQueries";

export const checkAuthOptions = queryOptions({
    queryKey: ['check-auth'],
    queryFn: checkAuth
})

export const signupOptions = mutationOptions({
    mutationFn: signup,
    onError: (error)=>{
        console.log('Error in signup options', error);
    }
})

export const loginOptions = mutationOptions({
    mutationFn: login,
     onError: (error)=>{
        console.log('Error in login options', error);
    }
})

export const logoutOptions = mutationOptions({
    mutationFn: logout,
    onError: (error)=>{
        console.log('Error in logout options', error);
    }
})

export const updatePorfileOptions = mutationOptions({
    mutationFn: updateProfile,
    onError: (error)=>{
        console.log('Error in logout options', error);
    }
})