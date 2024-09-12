import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({login, signup}) => {
  return (
    <main className='flex flex-row items-center justify-between px-10 pt-10 font-poppins'>
        <Link to={'/'}><div className='text-5xl font-semibold text-orange-600'>Chatterly</div></Link>
        <div className='flex flex-row items-center gap-10 text-xl font-medium'>
            {login != 'false' && <Link to={'/login'}><button className='hover:scale-105'>Login</button></Link> }
            {signup != 'false' && <Link to={'/signup'}><button className='text-white bg-gradient-to-r from-orange-600 to-orange-400 px-5 py-2 rounded-[50px] hover:scale-105'>Get Started</button></Link>}
        </div>
    </main>
  )
}

export default Header
