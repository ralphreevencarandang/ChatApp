import axios from '../lib/axios'
import toast from 'react-hot-toast';

export const getUsers = async ()=>{
    try {
        const res = await axios.get('/messages/users')
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('Error in get users function: ', error);
        toast.error(error.response.data.message)
        
    }
}

export const getMessages = async (id)=>{
    try {
        const res = await axios.get(`/messages/${id}`)
        console.log(res.data);
        return res.data       
    } catch (error) {
        console.log('Error in get messages function: ', error);
        toast.error(error.response.data.message)
    }
}