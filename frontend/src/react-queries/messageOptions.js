import { queryOptions, mutationOptions } from "@tanstack/react-query";
import { getUsers, getMessages, sendMessage } from "./messageQueries";

export const getUsersOptions = queryOptions({
    queryKey: ['users'],
    queryFn: getUsers
})

export const getMessagesOptions = (id) => ({
    queryKey: ['messages', id], // include the id in cache key
    queryFn: () => getMessages(id),
});


export const sendMessageOptions = mutationOptions({
    mutationFn: sendMessage,
    onError: (error)=>{
        console.log('Error in send message options: ', error);
        
    }
})