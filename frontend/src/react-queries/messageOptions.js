import { queryOptions, useMutation } from "@tanstack/react-query";
import { getUsers, getMessages, sendMessage } from "./messageQueries";

export const getUsersOptions = queryOptions({
    queryKey: ['users'],
    queryFn: getUsers
})

export const getMessagesOptions = (id)=>({
    queryKey: ['messages',id],
    queryFn: getMessages
})

// export const sendMessageOptions = useMutation({
//     mutationFn: sendMessage,
//     onError: (error)=>{
//         console.log('Error in send message options: ', error);
        
//     }
// })