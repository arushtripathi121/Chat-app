import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ContactComponent from '../components/ContactComponent';

const HomePage = () => {

  const navigate = useNavigate();

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

  useEffect(() => {
    const item = localStorage.getItem('token-data');
    if (!item) {
      navigate('/login')
    }
  }, [])

  return (
    <main className='flex w-screen h-screen'>
      <nav className='w-[15svh] border border-black'>

      </nav>

      <section className=' w-[100svh] flex flex-col'>
        <div className='h-[20svh]'> 
          <p className='text-2xl font-semibold px-5 pt-5'>Chats</p>
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

      <section className='bg-homeChat w-[290svh] h-screen border border-black rounded-lg'>
      </section>

    </main>
  )
}

export default HomePage
