import React, { useEffect, useState } from 'react';
import HomeSearchBar from '../components/HomeSearchBar';
import Card from '../components/Card';
import Sidebar from '../Sidebar/Sidebar';
import Work from './Work';
import Leaderboard from '../components/Leaderboard';

const Home = () => {
  const [selectedCategory,setSelectedCategory]=useState(null);
  const[jobs,setJobs]=useState([]);
  const [query,setQuery]=useState("");
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage = 4;
  

  useEffect(()=>{
      fetch("jobs.json").then(res=>res.json()).then(
        data=>{
            // console.log(data);
            setJobs(data);
        }
      )
  },[])

  const filteredItems=jobs.filter((job)=>job.role.toLowerCase().indexOf(query.toLowerCase())!==-1);
  console.log("filtered",filteredItems);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value === 'all' ? null : value);
  };

  const handleClick=(e)=>{
    setSelectedCategory(e.target.value);
    setSelectedCategory(value === 'all' ? null : value);
  }

  const calculatePageRange=()=>{
    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {startIndex,endIndex};
  }

  const nextPage = () =>{
    if(currentPage < Math.ceil(filteredItems.length/itemsPerPage)){
      setCurrentPage(currentPage+1);
    }
  }

  const prevPage = () =>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
  
    if (query) {
      filteredJobs = jobs.filter((job) =>
        job.role.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    if (selected && selected !== 'all') {
      filteredJobs = filteredJobs.filter(
        ({ location, searchRole,xp,type }) =>
          location.toLowerCase() === selected.toLowerCase() ||
          searchRole.toLowerCase() === selected.toLowerCase() || xp.toLowerCase()===selected.toLowerCase() || type.toLowerCase()===selected.toLowerCase()
      );
      console.log(filteredJobs);
    }
    const {startIndex,endIndex} = calculatePageRange();
    filteredJobs=filteredJobs.slice(startIndex,endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data}/>);
  };
  
  
  
  const result = filteredData(jobs,selectedCategory,query);

   
  return (
    <div className='text-primary bg-bgc'>
      <HomeSearchBar query={query} setQuery={setQuery}/>
      <div className='bg-navbg hover:bg-spark md:grid grid-cols-4 gap-8 lg:px-24 px-5 py-20'>
        <div className='bg-white p-4 rounded'><Sidebar handleChange={handleChange} handleClick={handleClick}/></div>
        <div className='col-span-2 bg-white p-0 rounded-sm'><Work result={result}/></div>
       
        <div className='bg-white p-4 rounded'><Leaderboard/></div>
      </div>
      {
          result.length > 0 ? (
             <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage}>Preious</button>
                <span>Page {currentPage} of {Math.ceil(filteredItems.length/itemsPerPage)}</span>
                <button onClick={nextPage}>Next</button>
             </div>
          ):
          (
            ""
          )
        }
    </div>
  )
}

export default Home
