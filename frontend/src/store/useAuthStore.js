import {create} from 'zustand';
import io from 'socket.io-client'
export const useAuthStore = create((set,get)=>({
    authUser: null,
    isCheckingAuth: true,
    // Socket
    socket: null,
    setAuthUser: (user)=>set({authUser: user}),
    onlineUsers: [],
    connectSocket: ()=>{
        const {authUser} = get()
        // if not login and already connected hindi na siya gagawa ng bagong socket
        if(!authUser || get().socket?.connected) return

        // initialize socket
        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            query:{

                userId: authUser._id
            }
        })
        socket.connect()


        // set the socket state 
        set({socket: socket})

        socket.on('getOnlineUsers', (userIds)=>{
            set({onlineUsers: userIds})
        })
    },
    disconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disconnect()
    }
    
}))