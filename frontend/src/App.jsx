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

function App() {

  return (
    <div>
      <Navbar/>
      
      <Routes>
          {/* Root Routes */}
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>
      </Routes>
    </div>
  )
}

export default App
