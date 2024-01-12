import React from 'react';
import {useForm} from 'react-hook-form';
import { useContext } from 'react';
import { UserDetailsContext } from '../App';
import { getDatabase,ref,get,set } from 'firebase/database';


    
const CreateJob = () => {
      const {userDetails} = useContext(UserDetailsContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const updateScore = (uid) => {
            // Assuming you have the necessary Firebase imports for the Realtime Database
            const db = getDatabase();
          
            // Reference to the user's score in the database
            const scoreRef = ref(db, `usersInfo/${uid}/score`);
          
            // Check if the user already has a score
            get(scoreRef)
              .then((snapshot) => {
                if (snapshot.exists()) {
                  // If the score exists, add 500 to the existing total
                  const currentScore = snapshot.val();
                  set(scoreRef, currentScore + 500);
                } else {
                  // If the score doesn't exist, create it with an initial value of 500
                  set(scoreRef, 500);
                }
              })
              .catch((error) => {
                console.error('Error updating score:', error);
              });
          };
      const onSubmit = (data) => {
            console.log(data)
            
            fetch("https://nextspark-backend.onrender.com/works/post-to-review",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).then(res=>res.json()).then((result)=>{
                  console.log(result);
                  updateScore(userDetails.uid)
                  console.log(userDetails.uid,43);
                  
            })
      }
      
      console.log(watch("example"))
  return (
    <div className='max-w-screen-2xl container mx-auto x1:px-24 px4'>
           <div className='bg-navbg py-10 px-4 lg:px-16'>
                 <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                             <div className='lg:w-1/2 w-full'>
                                   <label className='block mb-2 text-lg '>Role : </label>
                                   <input type="text" defaultValue={""} {...register("role")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'/>
                             </div>
                             <div className='lg:w-1/2 w-full'>
                                   <label className='block mb-2 text-lg '>Company : </label>
                                   <input type="text" defaultValue={""} {...register("company")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'/>
                             </div>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                             <div className='lg:w-1/2 w-full'>
                                   <label className='block mb-2 text-lg '>location : </label>
                                   <input type="text" defaultValue={""} {...register("location")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'/>
                             </div>
                             <div className='lg:w-1/2 w-full'>
                                   <label className='block mb-2 text-lg '>Pay : </label>
                                   <input type="text" defaultValue={""} {...register("pay")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'/>
                             </div>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                                 <div className='lg:w-1/2 w-full'>
                                      <label className='block mb-2 text-lg'>Experience : </label>
                                           <select {...register("xp", { required: true })} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'>
                                            <option value='0'>Fresher</option>
                                            <option value='0-1'>0-1 YOE</option>
                                            <option value='1+'>1+ YOE</option>
                                            </select>
                                  </div>
                                 <div className='lg:w-1/2 w-full'>
                                      <label className='block mb-2 text-lg'>Search Role : </label>
                                             <select {...register("searchRole", { required: true })} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'>
                                             <option value='Software Developer'>Software Developer</option>
                                              <option value='Testing'>Testing</option>
                                             <option value='UI/UX'>UI/UX</option>
                                             <option value='Backend Developer'>Backend Developer</option>
                                             <option value='Frontend Developer'>Frontend Developer</option>
                                             </select>
                                    </div>
                        </div>
    <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                            <div className='lg:w-1/2 w-full'>
                                   <label className='block mb-2 text-lg '>Degree : </label>
                                   <input type="text" defaultValue={""} {...register("degree")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'/>
                             </div>
    
                        <div className='lg:w-1/2 w-full'>
                             <label className='block mb-2 text-lg'>Work Type : </label>
        <select {...register("type", { required: true })} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'>
            <option value='Full-Time'>Full-Time</option>
            <option value='Intern'>Intern</option>
            <option value='Part-Time'>Part-Time</option>
            <option value='Contractual'>Contractual</option>
        </select>
                       </div>

     </div>
     <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                             <div className='lg:w-1/2 w-full'>
                                   <label className='block mb-2 text-lg '>Company Logo : </label>
                                   <input type="text" defaultValue={""} {...register("logo")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'/>
                             </div>
                             <div className='lg:w-1/2 w-full'>
                                   <label className='block mb-2 text-lg '>Posted by : </label>
                                   <input type="text" defaultValue={""} {...register("postedBy")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'/>
                             </div>
                        </div>

                         <input type='submit'/>
                 </form>
           </div>
          
           
    </div>
  )
}

export default CreateJob
