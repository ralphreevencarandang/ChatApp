import { create } from "zustand";
export const useChatStore = create((set)=> ({
    messages: [],
    selectedUser: null,
    // todo: optimize this one later
    setSelectedUser: (selectedUser) => set({selectedUser})
}))