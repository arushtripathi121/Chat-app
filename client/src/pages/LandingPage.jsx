import React from 'react'
import Header from '../components/Header'
import landingPagePhoto from '../assets/landingPagePhoto.png';
import ChatBoxLandingPage from '../components/ChatBoxLandingPage';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main>

      <header>
        <Header />
      </header>

      <section className='font-poppins grid grid-cols-2 px-10'>
        <div className='space-y-5 pt-40'>
          <p className='text-5xl font-bold'>Welcome to Chatterly</p>
          <p className='text-2xl font-semibold'>Connect Instantly, Chat Effortlessly</p>
          <p className='text-xl text-slate-600 font-medium text-justify'>At Chatterly, we believe that communication should be simple, fast, and enjoyable.
            Whether you're catching up with friends, meeting new people, or collaborating with your team,
            Chatterly offers you a smooth and user-friendly chat experience that adapts to your needs.</p>
            <p className='pt-10'><Link to={'/login'}><button className='text-2xl font-bold text-white bg-gradient-to-r from-orange-600 to-orange-400 px-5 py-2 rounded-[50px] hover:scale-105'>Start Chatting Now</button></Link></p>
        </div>

        <div className='flex flex-col items-center pt-20'>
          <p className='px-[250px] py-[250px] rounded-[250px] absolute top-80  bg-gradient-to-r from-orange-600 to-orange-400'></p>
          <img src={landingPagePhoto} className='w-[60svh] relative'/>
          <p className='absolute top-[600px] right-[500px]'><ChatBoxLandingPage/></p>
          <p className='absolute top-[700px] right-[50px]'><ChatBoxLandingPage/></p>
        </div>

      </section>

    </main>
  )
}

export default LandingPage
