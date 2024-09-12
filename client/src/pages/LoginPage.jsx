import React from 'react'
import Header from '../components/Header'

const LoginPage = () => {
  return (
    <main>
      <Header login={"false"} />

      <section className='flex justify-center items-center pt-32 bg-white'>
        <form className='bg-white shadow-lg rounded-lg p-10 flex flex-col items-center gap-6 w-full max-w-md'>
          <p className='text-4xl font-bold text-gray-800'>Log in</p>
          <input
            type='email'
            placeholder='Email'
            className='w-full text-lg border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          <input
            type='password'
            placeholder='Password'
            className='w-full text-lg border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          <button
            type='submit'
            className='w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-300'
          >
            Log in
          </button>
        </form>
      </section>

    </main>

  )
}

export default LoginPage
