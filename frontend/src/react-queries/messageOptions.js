import { queryOptions } from "@tanstack/react-query";
import { getUsers, getMessages } from "./messageQueries";
export const getUsersOptions = queryOptions({
    queryKey: ['users'],
    queryFn: getUsers
})

export const getMessagesOptions = (id)=>({
    queryKey: ['messages',id],
    queryFn: getMessages
})