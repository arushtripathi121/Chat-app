import React from 'react'
import ContactComponentImage from '../assets/chatBoxPhoto.jpeg'
const ContactComponent = () => {

    return (
        <div className='px-4 py-2 bg-orange-50 rounded-lg shadow-md'>
            <button className='w-full flex items-center gap-4 p-4 bg-white border border-orange-200 rounded-lg hover:bg-orange-100 transition duration-300 ease-in-out'>
                <img src={ContactComponentImage} className='w-[60px] h-[60px] rounded-full border border-orange-300' alt="Contact" />
                <p className='flex flex-row justify-between items-center w-full pr-5'>
                    <span className='text-xl font-medium text-gray-800'>Aditya Giri</span>
                    <span className='text-sm text-gray-500'>17:51</span>
                </p>
            </button>
        </div>
    )
}

export default ContactComponent
