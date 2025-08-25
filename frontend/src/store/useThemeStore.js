import { create } from "zustand";

export const useThemeStore = create((set)=>({
    // get the theme in the local storage or set the theme into coffee
    theme:  localStorage.getItem('theme') || "coffee",
    setTheme: (theme)=> {
        // set the local storage theme
        localStorage.setItem('theme', theme)
        // set theme
        set({theme})
    }

}))