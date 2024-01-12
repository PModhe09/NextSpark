import React, { useState } from 'react';
import { FcSearch,FcGlobe } from 'react-icons/fc';


const HomeSearchBar = ({ query, setQuery }) => {
//   const [query, setQuery] = useState('');

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

  return (
    <div className='text-primary h-screen  max-w-screen-2xl container mx-auto x1:px-24 px-4 md:py-24 py-14'>
      <h1 className='text-5xl text-primary mb-3 font-bold'>
        Find your <span className='text-spark'>Perfect</span> workplace
      </h1>
      <p className='text-lg text-black mb-8'>Best Job/Internship Sharing Place on the Web</p>
      <form>
  <div className='flex justify-start md:flex-row flex-col gap-10 mt-44'>
    <div className='flex md:rounded-md rounded shadow-sm ring-1 ring-inset ring-navbg focus-within:ring-2 focus-within:ring-inset focus-within:ring-spark md:w-1/2 w-full'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Role'
        className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-800 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6'
      />
      <FcSearch className='absolute mt-2.5 ml-3 text-gray-50' />
    </div>

    <div className='flex md:rounded-md rounded shadow-sm ring-1 ring-inset ring-navbg focus-within:ring-2 focus-within:ring-inset focus-within:ring-spark md:w-1/2 w-full'>
      <input
        type='text'
        name='title'
        id='title'
        placeholder='Location'
        className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-800 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6'
        value={""}
      />
      <FcGlobe className='absolute mt-2.5 ml-2 text-gray-400' />
    </div>

    <button type='submit' className='bg-navbg py-2 px-8 text-primary font-bold  md:rounded-md rounded hover:bg-spark'>
      Search
    </button>
  </div>
</form>

    </div>
  );
};

export default HomeSearchBar;
