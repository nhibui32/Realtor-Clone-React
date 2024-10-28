import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FcHome } from "react-icons/fc";
import { Link } from 'react-router-dom';


export default function Profile() {
  const auth = getAuth();
  const [ChangeDetail, setChangeDetail] = useState(false);
  const Navigate = useNavigate();
  const[formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const {name, email} = formData;
  const OnLogOut = () => {
    auth.signOut();
    Navigate("/")
  }
  const onChange = (e) =>{
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id] : e.target.value,
    }));
  }

  const onsubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name){
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {displayName: name})

        //update the name to the Firestore 
        const docRef = doc(db, "users", auth.currentUser.uid )
        await updateDoc(docRef, {name,

        });
        toast.success("Profile has been updated")
      }
      
    } catch (error) {
      toast.error("Could not update the profile detail")
    }
  }
  return (
    <div>
      <section className='max-w-6xl mx-auto flex-col justify-center items-center flex'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>

            {/* Name Input */}

            <input type="text" id="name" value={name} disabled={!ChangeDetail} onChange={onChange}  className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${ChangeDetail && "bg-red-200 focus:bg-red-200"}`} />

            {/* Email Input */}

            <input type="email" id="email" value={email} disabled={!ChangeDetail} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${ChangeDetail && "bg-red-200 focus:bg-red-200"}`}/>

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='flex items-center mb-6'>Do you want to change your name? <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer' onClick={() =>{
                ChangeDetail && onsubmit();
                setChangeDetail((PrevState) => !PrevState);
              }}>
                {ChangeDetail ? "Apply Change" : "Edit"}
                </span> </p>
              <p className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 ml-1 cursor-pointer' onClick={OnLogOut}>Sign out</p>
            </div>
          </form>
          <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 rounded text-sm font-medium shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
            <Link to="/create-listing" className='flex justify-center items-center'>
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>
              Sell or Rent your Home
            </Link>
          </button>
        </div>
      </section>

    </div>
  )
}
