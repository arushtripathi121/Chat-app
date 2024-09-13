import React, { useEffect, useState, useSyncExternalStore } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const signUp = async () => {
    const data = await fetch(`http://localhost:5000/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })

    const res = await data.json();
    const token = res.token;
    if (res.success == false) {
      setErrorMessage(res.message);
    }

    const obj = { token }
    if (res.success == true) {
      setSuccess(true);
    }
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    signUp();
  }

  useEffect(() => {
    if (success == true) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000)
    }
  }, [success]);

  return (
    <main>
      <Header signup={'false'} login={'false'} />

      {success == true ? <p className='absolute inset-0 flex flex-col top-32 items-center'><span className='border border-black shadow-md shadow-gray-500 px-2 py-2 rounded-xl '>Account created, redirecting to login page</span></p> : ''}
      <section className='flex justify-center items-center pt-32 bg-white'>
        <form className='bg-white shadow-lg rounded-lg p-10 flex flex-col items-center gap-6 w-full max-w-md'>
          <p className='text-4xl font-bold text-gray-800'>Sign up</p>
          <input
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Name'
            className='w-full text-lg border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
            className='w-full text-lg border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            className='w-full text-lg border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          <button
            onClick={onHandleSubmit}
            type='submit'
            className='w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-300'
          >
            Sign up
          </button>

          <p className='text-red-600 font-medium '>{errorMessage}</p>
        </form>
      </section>
    </main>
  )
}

export default SignUpPage
