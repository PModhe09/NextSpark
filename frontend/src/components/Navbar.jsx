import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { GiSplitCross } from "react-icons/gi";
import { UserDetailsContext } from '../App';
import { useContext } from 'react';
import {CircleUserRound} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setClose] = useState(false);
  //const [showProfile, setShowProfile] = useState(false);
  const UserDetail = useContext(UserDetailsContext);
  console.log(UserDetail);
  

  const Toggler = () => {
    setClose(!isOpen);
  };

  const navItems = [
    { path: '/', title: 'Start a search' },
    { path: '/my-work', title: 'My Posts' },
    { path: '/create-job', title: 'Post' }
  ];

  return (
    <header className='text-black max-w-screen-2xl container mx-auto x1:px-24 px-4 bg-bigbg sticky top-0'>
      <nav className='flex justify-between items-center'>
        <a href='/' className='flex items-center gap-2 text-2xl'>
          <span>NextSpark</span>
        </a>

        <ul className='hidden md:flex gap-12 '>
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active:' : 'pending')}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
       
          <div><div className='font-medium text-black space-x-5 hidden lg:block'>
            <Link to="/login" className=' border rounded bg-blue-600 hover:bg-spark'><CircleUserRound size={45} absoluteStrokeWidth={true} strokeWidth={3} /></Link>
          </div></div>
        

        <div className='md:hidden block'>
          <button onClick={Toggler}>
            {isOpen ? <GiSplitCross className='w-5 h-5 text-primary' /> : <TbLayoutSidebarLeftCollapseFilled className='w-5 h-5 text-primary' />}
          </button>
        </div>
      </nav>

      <div className={`px-4 bg-black py-5 rounded-sm ${isOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className='text-white'>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active:' : 'pending') }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
