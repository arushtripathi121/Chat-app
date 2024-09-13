import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContactComponent from '../components/ContactComponent';
import { CiChat1 } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import ProfileComponent from '../components/ProfileComponent';

const HomePage = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    const data = await fetch('http://localhost:5000/logout', {
      method: 'GET'
    })

    const res = await data.json();

    if (res.success = true) {
      localStorage.setItem('token-data', '');
      navigate('/login');
    }
  }

  const handleMenu = () => {
    setShowMenu(!showMenu);
  }

  const handleProfile = () => {
    setShowProfile(!showProfile);
  }

  useEffect(() => {
    const item = localStorage.getItem('token-data');
    if (!item) {
      navigate('/login')
    }
  }, [])

  return (
    <main>
      <container className='flex w-screen h-screen font-poppins'>
      <nav className='w-[15svh] bg-gray-200 flex flex-col items-center gap-5 pt-5'>
        <p><LuMenu onClick={handleMenu} className='w-full text-3xl text-orange-600 cursor-pointer' /></p>
        <p><CiChat1 className='w-full text-3xl text-orange-600 border-l-4 border-orange-600 cursor-pointer' /></p>
        <p onClick={handleProfile}><FaUser className='w-full text-3xl text-orange-600 cursor-pointer' /></p>
      </nav>

      {showMenu &&
        <nav className='w-[22svh] absolute h-full bg-opacity-95 bg-gray-200 flex flex-col items-start px-3 justify-between pb-4'>
          <div className='flex flex-col items-start  pt-5 gap-5 '>
            <p className='text-orange-600 text-xl gap-5'><LuMenu onClick={handleMenu} className='w-full text-3xl text-orange-600 cursor-pointer' /></p>
            <p className='text-orange-600 text-xl flex gap-5'><CiChat1 className='w-full text-3xl border-l-4 border-orange-600 text-orange-600 cursor-pointer' />Chats</p>
            <p onClick={handleProfile} className='text-orange-600 text-xl flex gap-5'><FaUser className='w-full text-3xl text-orange-600 cursor-pointer' />Profile</p>
          </div>
          <div className='w-full'>
            <button className='bg-red-500 text-white px-3 py-1 rounded-xl w-full text-xl hover:bg-red-600' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      }

        <section className=' w-[100svh] flex flex-col'>
          <div className='h-[20svh]'>
            <p className='text-2xl text-orange-600 font-semibold px-5 pt-5'>Chats</p>
            <p className='px-2 pt-4'><input type='text' className='w-full outline-none px-3 py-2 text-lg font-medium rounded-2xl bg-gray-100 ' placeholder='Search or start a new chat' /></p>
          </div>
          <div className='flex flex-col pt-2 component-with-scrollbar overflow-y-auto h-[110svh]'>
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
            <ContactComponent />
          </div>
        </section>

        <section className='bg-homeChat w-[290svh] h-screen rounded-2xl overflow-y-auto'>
        </section>
        </container>

        {
          showProfile && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><ProfileComponent profile={handleProfile}/></div>
        }
    </main>
  )
}

export default HomePage
