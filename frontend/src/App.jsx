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
import { useThemeStore } from "./store/useThemeStore"

import { Navigate } from "react-router"

function App() {


  const {authUser} = useAuthStore()
  const {theme} = useThemeStore();

  return (
    <div data-theme={theme}>
      
      <Navbar/>
      <Routes>
          {/* Root Routes */}
            <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to='/' />}/>
            <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>

          <Route path="*" element={<NotFoundPage/>}/>

      </Routes>

    </div>
  )
}

export default App
