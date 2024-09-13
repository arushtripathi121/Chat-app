import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const data = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers : {
        "Content-Type" :"application/json",
      },
      body: JSON.stringify({email, password})
    })

    const res = await data.json();

    if(res.success == false) {
      setErrorMessage(res.message);
    }
    else{
      const token = res.token;
      const obj = { token };
      localStorage.setItem('token-data', JSON.stringify({obj}));
      navigate('/home')
    }
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    login();
  }
  return (
    <main>
      <Header login={"false"} />

      <section className='flex justify-center items-center pt-32 bg-white'>
        <form className='bg-white shadow-lg rounded-lg p-10 flex flex-col items-center gap-6 w-full max-w-md'>
          <p className='text-4xl font-bold text-gray-800'>Log in</p>
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
            Log in
          </button>
          <p className='text-red-600 font-medium '>{errorMessage}</p>
        </form>
      </section>

    </main>

  )
}

export default LoginPage
