import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get)=> ({

 
    selectedUser: null,
    // todo: optimize this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),


}))