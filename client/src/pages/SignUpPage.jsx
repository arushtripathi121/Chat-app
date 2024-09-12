import React from 'react'
import Header from '../components/Header'

const SignUpPage = () => {
  return (
    <main>
      <Header signup={'false'} login={'false'} />

      <section className='text-center py-32'>
        <form className='flex flex-col items-center gap-5 '>
          <p>Sign Up</p>
          <input type='text' placeholder='Name' className='text-xl border border-black px-3 py-2 rounded-xl' />
          <input type='text' placeholder='Email' className='text-xl border border-black px-3 py-2 rounded-xl' />
          <input type='text' placeholder='Password' className='text-xl border border-black px-3 py-2 rounded-xl' />
          <button type='submit'>Sign up</button>
        </form>
      </section>
    </main>
  )
}

export default SignUpPage
