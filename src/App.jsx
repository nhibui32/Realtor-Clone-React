import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/privateRoute'
import CreateListing from './pages/CreateListing'
import Logo from '/favicon.ico'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Bounce } from 'react-toastify';


function App() {
  return (
    <>
      <Router>
        {/* Put the header outside the route, so it will apply to all the pages */}
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* the privateRoute cover the profile, if the user login they will go into the profile otherwise they go to the sign-in  */}
          <Route path='profile' element={<PrivateRoute/>}>
            <Route index element={<Profile/>}/>
          </Route>
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='offers' element={<Offers/>}/>
          <Route path='create-listing' element={<PrivateRoute/>}>
            <Route index element={<CreateListing/>}/>
          </Route>
          
          <Route path='sign-in' element={<SignIn/>}/>
          <Route path='sign-up' element={<SignUp/>}/>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        />
    </>
  )
}

export default App
