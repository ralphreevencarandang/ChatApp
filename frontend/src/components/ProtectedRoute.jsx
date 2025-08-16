import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Navigate } from 'react-router'
const ProtectedRoute = ({children}) => {

    const {authUser} = useAuthStore();
  return  authUser ? children : <Navigate to={'/login'} replace/>
}

export default ProtectedRoute
