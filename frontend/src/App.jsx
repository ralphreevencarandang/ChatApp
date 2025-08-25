import { BrowserRouter, Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

import { Navigate } from "react-router"

function App() {


  const {authUser} = useAuthStore()

  return (
    <div>
      
      <Navbar/>
      <Routes>
          {/* Root Routes */}
            <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to='/' />}/>
            <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>

          <Route path="*" element={<NotFoundPage/>}/>

      </Routes>

    </div>
  )
}

export default App
