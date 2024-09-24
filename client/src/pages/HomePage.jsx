import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactComponent from '../components/ContactComponent';
import { CiChat1 } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import ProfileComponent from '../components/ProfileComponent';
import ChatBox from '../components/ChatBox';
import Search from '../components/Search';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { serverApi } from '../constants/api'
import { setOnlineUser, setSocketConnection, setContactList } from '../redux/userSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUserChatData, setCurrentUserChatData] = useState(null);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const userId = localStorage.getItem('_id');
  const [activeSection, setActiveSection] = useState('search');
  const isMobileView = window.innerWidth < 1024;
  const socketConnection = useSelector(state => state?.user?.socketConnection);
  const responseData = useSelector(state => state?.user?.contactList); // Get contactList from Redux

  const setChatData = (data) => {
    setCurrentUserChatData(data);
    setActiveSection('chat');
  };

  const handleLogout = async () => {
    const data = await fetch(`${serverApi}logout`, {
      method: 'GET',
    });

    const res = await data.json();

    if (res.success === true) {
      localStorage.setItem('token-data', '');
      localStorage.setItem('_id', '');
      navigate('/login');
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleProfile = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    const item = localStorage.getItem('token-data');
    if (!item) {
      navigate('/login');
    }
    setToken(item);
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('token-data');
    const userId = localStorage.getItem('_id');

    if (!item || !userId) {
      navigate('/login');
      return;
    }
    setToken(item);

    const socketIoConnection = io(serverApi, {
      auth: {
        token: item,
      },
    });

    dispatch(setSocketConnection(socketIoConnection));

    socketIoConnection.on('onlineUser', (data) => {
      dispatch(setOnlineUser(data));
    });

    return () => {
      socketIoConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.on('contactResponse', (contacts) => {
        const filteredContacts = contacts.filter(contact => contact._id !== userId);
        dispatch(setContactList(filteredContacts)); // Store in Redux
      });
    }
  }, [socketConnection]);

  return (
    <main className='flex w-full h-screen font-poppins'>
      <nav className='w-[60px] md:w-[80px] bg-gray-200 flex flex-col items-center gap-6 pt-5'>
        <LuMenu
          onClick={handleMenu}
          className='text-3xl text-orange-600 cursor-pointer'
        />
        <CiChat1
          className='text-3xl text-orange-600 border-l-4 border-orange-600 cursor-pointer'
        />
        <FaUser
          onClick={handleProfile}
          className='text-3xl text-orange-600 cursor-pointer'
        />
      </nav>

      {showMenu && (
        <nav className='absolute left-0 top-0 h-full w-[220px] bg-gray-200 bg-opacity-95 flex flex-col items-start p-5'>
          <div className='flex flex-col gap-6'>
            <LuMenu
              onClick={handleMenu}
              className='text-3xl text-orange-600 cursor-pointer'
            />
            <div className='text-orange-600 text-xl flex items-center gap-3'>
              <CiChat1 className='text-3xl border-l-4 border-orange-600' />
              Chats
            </div>
            <div
              onClick={handleProfile}
              className='text-orange-600 text-xl flex items-center gap-3 cursor-pointer'
            >
              <FaUser className='text-3xl' />
              Profile
            </div>
          </div>
          <div className='mt-auto w-full'>
            <button
              className='bg-red-500 text-white px-3 py-2 rounded-lg w-full text-lg hover:bg-red-600'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      )}

      <main className='flex h-screen w-full'>
        {isMobileView ? (
          activeSection === 'search' ? (
            <section className='w-full h-full flex flex-col bg-gray-100'>
              <Search setUserData={setChatData} />
              <div className='flex-grow overflow-y-auto'>
                {responseData && responseData.map((m, index) => (
                  <ContactComponent key={index} data={m} setUserData={setChatData} />
                ))}
              </div>
            </section>
          ) : (
            <section className='w-full h-full bg-white flex flex-col'>
              <div className='p-2'>
                <FaArrowLeft
                  className='text-3xl text-orange-600 cursor-pointer'
                  onClick={() => setActiveSection('search')}
                />
              </div>
              <ChatBox data={currentUserChatData} className='flex-grow overflow-y-auto' />
            </section>
          )
        ) : (
          <>
            <section className='flex flex-col w-3/12 lg:w-1/4 flex-grow h-full border border-orange-200 shadow-lg shadow-orange-200 rounded-xl'>
              <Search setUserData={setChatData} />
              <div className='flex-grow overflow-y-auto'>
                {responseData && responseData.map((m, index) => (
                  <ContactComponent key={index} data={m} setUserData={setChatData} />
                ))}
              </div>
            </section>
            <section className='hidden lg:block flex-grow bg-white rounded-2xl w-9/12 lg:w-3/4 h-full'>
              <ChatBox data={currentUserChatData} className='flex-grow overflow-y-auto' />
            </section>
          </>
        )}
      </main>

      {showProfile && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <ProfileComponent profile={handleProfile} />
        </div>
      )}
    </main>
  );
}

export default HomePage;
