import * as React from 'react';
import { Navigate } from 'react-router-dom';

export interface RouteComponent {
}

export function PrivateRoute({ component } : any) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  if (!isLoggedIn) return <Navigate to='/login'/>
  
  return component;
}
