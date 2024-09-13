import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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
    <div>
      This is home page
      <button className='bg-red-600 text-white text-xl font-semibold px-2 py-2' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage
