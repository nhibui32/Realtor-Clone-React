import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Logo from '/favicon.ico'


function App() {
  return (
    <>
      <Router>
        {/* Put the header outside the route, so it will apply to all the pages */}
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='offers' element={<Offers/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='sign-in' element={<SignIn/>}/>
          <Route path='sign-up' element={<SignUp/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
