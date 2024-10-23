import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import {useAuthStatus} from '../Hooks/useAuthStatus';
useAuthStatus
export default function privateRoute() {
    const {LoggedIn, checkingStatus} = useAuthStatus();
    if(checkingStatus){
      return(
        <h1>Loading....</h1>
      )
    }
    return LoggedIn ? <Outlet/> : <Navigate to = "/sign-in"/>
    // if the log in is true qwe will return everything inside the profile ortherwise we will direct the user to sign in page
  
}
