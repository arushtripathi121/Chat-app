import React from 'react'
import ContactComponentImage from '../assets/chatBoxPhoto.jpeg'

const ContactComponent = ({ data }) => {
    console.log(data);

    return (
        <div className='w-full bg-white rounded-lg shadow-md border border-gray-200'>
            <button className='flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out w-full'>
                <img
                    src={ContactComponentImage}
                    className='w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-orange-300'
                    alt="Contact"
                />
                <div className='flex flex-col w-full ml-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm md:text-lg font-semibold text-gray-800 truncate'>Aditya Giri</p>
                        <p className='text-xs md:text-sm text-gray-500 whitespace-nowrap'>{`17:51`}</p>
                    </div>
                </div>
            </button>
        </div>

    )
}

export default ContactComponent
