import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    setAuthUser: (user)=>set({authUser: user}),
    onlineUsers: []
    
}))