import React from 'react'
import ContactComponentImage from '../assets/chatBoxPhoto.jpeg'
const ContactComponent = () => {

    return (
        <div className='px-1 py-1'>
            <button className='w-full flex flex-row items-center gap-5 '>
                <img src={ContactComponentImage} className='w-[60px] rounded-[60px]' />
                <p className='flex flex-row justify-between items-center w-full pr-5'> 
                    <span className='text-xl font-medium'>Aditya Giri</span>
                    <span className='text-sm'>17:51</span>
                </p>
            </button>
        </div>
    )
}

export default ContactComponent
