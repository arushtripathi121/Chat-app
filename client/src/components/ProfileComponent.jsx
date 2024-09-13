import React, { useEffect } from 'react'

const ProfileComponent = () => {

    const getUserDetails = async () => {
        const res = await fetch ('http://localhost:5000/getUserDetails');
        const data = await res.json();
        console.log(data);
    }

    useEffect(() => {
        const token = localStorage.getItem('token-data');
        console.log(token);
        
        getUserDetails();
    }, []);
  return (
    <div className='text-5xl bg-gray-200 px-10 py-10 bg-opacity-70 w-[650px] h-[650px]'>
      This is profile
    </div>
  )
}

export default ProfileComponent
