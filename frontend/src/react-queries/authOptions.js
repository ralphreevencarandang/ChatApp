import { mutationOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { checkAuth, signup } from "./authQueries";

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