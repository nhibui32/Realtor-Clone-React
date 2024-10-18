import React from 'react'
import { useLocation, useNavigate } from 'react-router'
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  // we can use location.pathname to get their path name and location 
  // console.log(location.pathname)
  function pathMathRoute(route){
    if(route === location.pathname){
      return true;
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      {/* position: sticky it means stay as some where, and the say where it will stay. z-50 ( z index of everything, if z-0 on the top, z--1 go under, z-50 just to make sure it always be on top) */}
      <header className='flex justify-between items-center px-3 max-w-6x1 mx-autov'>
        <div>
            <img src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg" alt="logo" className='h-5 cursor-pointer' onClick={() => navigate("/")}/>
        </div>
        <div>
            <ul className='flex space-x-10'>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-black border-b-red-500"}`} onClick={() => navigate("/")}>Home</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`} onClick={() => navigate("/offers")}>Offers</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "text-black border-b-red-500"}`} onClick={() => navigate("/sign-in")}>Sign in</li>
            </ul>
        </div>
      </header>
    </div>
  )
}
