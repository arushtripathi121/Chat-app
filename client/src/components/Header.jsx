import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ login, signup }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const item = localStorage.getItem('token-data');
    if (item) {
      navigate('/home');
    }
    else {
      navigate('/login');
    }
  }

  const handleSignup = () => {
    const item = localStorage.getItem('token-data');
    if (item) {
      navigate('/home');
    }
    else {
      navigate('signup')
    }
  }
  return (
    <main className='flex flex-row items-center justify-between px-10 pt-10 font-poppins'>
      <Link to={'/'}><div className='text-5xl font-semibold text-orange-600'>Chatterly</div></Link>
      <div className='flex flex-row items-center gap-10 text-xl font-medium'>
        {login != 'false' && <button onClick={handleLogin} className='hover:scale-105'>Login</button>}
        {signup != 'false' && <button onClick={handleSignup} className='text-white bg-gradient-to-r from-orange-600 to-orange-400 px-5 py-2 rounded-[50px] hover:scale-105'>Get Started</button>}
      </div>
    </main>
  )
}

export default Header
