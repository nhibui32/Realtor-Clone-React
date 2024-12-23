import React, { useState } from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { db } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const {name, email, password} = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      // createUserWithEmailAndPassword return a promise, so we have to use async /await 
      const userCredential = await createUserWithEmailAndPassword(auth, email, password );
      // The thing we wanna to update, we have to put it inside an object 
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const user = userCredential.user;
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy)
       toast.success("Sign up was successful!!!")
      navigate("/");

    } catch (error) {
      toast.error("Something went wrong with registration")
      
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="key" 
          className='w-full rounded-2xl'
          />
        </div>
        <div  className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input type="text" id="name" value={name} onChange={onChange} placeholder="Full Name"
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'/>
            <input type="email" id="email" value={email} onChange={onChange} placeholder='Email address'
            className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'/>
            <div className='relative '>
              <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} placeholder='Password'
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'/>
              {showPassword ? (
                <FaEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>{ setShowPassword((prevState) => !prevState)}} 
                />) : 
                (<FaEyeSlash className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>{ setShowPassword((prevState) => !prevState)}} />)
              }
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            {/* whitespace-nowrap to prevent them to go to the second line! */}
              <p className='mb-6'>Have an account
                <Link to="/sign-in" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'> Sign up</Link>
              </p>
              <p>
              <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1'>Forgot password?</Link>
              </p>
            </div>
              <button type='submit' className='w-full bg-blue-600 text-white text-sm font-medium px-7 py-3 uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Sign up</button>
          <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth/>
          </form>
        </div>
      </div>
    </section>
  )
}
