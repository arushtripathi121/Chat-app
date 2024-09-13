import React from 'react'
import { AiOutlineSend } from "react-icons/ai";

const ChatBox = () => {
  return (
    <main className='h-full w-full'>
        <section className='h-[90svh] overflow-y-auto component-with-scrollbar'></section>
        <section className='b h-[10svh] flex flex-col items-center'>
            <div className='flex flex-row pt-5 w-[120svh] items-center gap-5'>
                <input type='textarea' placeholder='write you message' className='outline-none w-full px-5 py-2 text-xl rounded-lg border border-black bg-gray-100 bg-opacity-50 font-medium'/>
                <button className='px-2 py-2 bg-orange-600 rounded-[30px] '><AiOutlineSend className='h-[30px] w-[30px] text-white'/></button>
            </div>
        </section>
    </main>
  )
}

export default ChatBox
