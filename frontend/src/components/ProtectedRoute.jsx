import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Navigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { checkAuthOptions } from '../react-queries/authOptions'
import { Outlet } from 'react-router'
const ProtectedRoute = () => {
  const {data, isFetching} = useQuery(checkAuthOptions)
  const {authUser} = useAuthStore();

    // habang nagloload yung checkAuth, wag muna i-redirect
  if (isFetching) {
    return <p>Checking authentication...</p>
  }

  console.log(data);
  

  return  authUser ?  <Outlet /> : <Navigate to={'/login'} replace/>
}

export default ProtectedRoute
