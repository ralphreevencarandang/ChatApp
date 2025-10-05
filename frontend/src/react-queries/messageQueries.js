import axios from '../lib/axios'
import toast from 'react-hot-toast';

export const getUsers = async ()=>{
    try {
        const res = await axios.get('/messages/users')
        return res.data
    } catch (error) {
        console.log('Error in get users function: ', error);
        toast.error(error.response?.data?.message || 'Failed to fetch users')
        throw error; // Important: throw the error so React Query can handle it
    }
}

export const getMessages = async (id) => {
    try {
        const res = await axios.get(`/messages/${id}`)
        
        return res.data       
    } catch (error) {
        console.log('Error in get messages function: ', error);
        toast.error(error.response?.data?.message || 'Failed to fetch messages')
        throw error; // Important: throw the error so React Query can handle it
    }
}

export const sendMessage = async ({ id, values }) => {
    try {
        const res = await axios.post(`/messages/send/${id}`, values)

        return res.data;
    } catch (error) {
        console.log('Error in send message function: ', error);
        toast.error(error.response?.data?.message || 'Failed to send message')
        throw error; // Re-throw so mutation can handle the error
    }
}