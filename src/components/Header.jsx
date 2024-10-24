import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
export default function Header() {
  const [pageState, setPageState] = useState("Sign In")
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect( () => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState("Profile");
      }else{
        setPageState("Sign In");
      }
    })
  }, [auth])
  // we can use location.pathname to get their path name and location 
  // console.log(location.pathname)
  function pathMatchRoute(route){
    if(route === location.pathname){
      return true;
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
      {/* position: sticky it means stay as some where, and the say where it will stay. z-50 ( z index of everything, if z-0 on the top, z--1 go under, z-50 just to make sure it always be on top) */}
      <header className='flex justify-between items-center px-3 max-w-6x1 mx-auto'>
        <div>
            <img src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg" alt="logo" className='h-5 cursor-pointer' onClick={() => navigate("/")}/>
        </div>
        <div>
            <ul className='flex space-x-10'>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-gray-950 border-b-red-500"}`} onClick={() => navigate("/")}>Home</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "text-gray-950 border-b-red-500"}`} onClick={() => navigate("/offers")}>Offers</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && " text-gray-950 border-b-red-500"}`} onClick={() => navigate("/profile")}>
                  {pageState}
                </li>
            </ul>
        </div>
      </header>
    </div>
  )
}
