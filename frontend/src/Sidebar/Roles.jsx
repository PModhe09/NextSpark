import React from 'react';
import InputField from '../components/InputField';

const Roles = ({ handleChange }) => {
  return (
    <div className="flex flex-col items-center">
      <h4 className='text-lg font-medium mb-3 text-left'>Work Type</h4>
      <div className="text-left space-y-2">
        <label className='text-left flex items-center cursor-pointer'>
          <input
            type='radio'
            name='workFilter'
            value='all'
            onChange={handleChange}
            className='form-radio h-3 w-3 text-spark'
          />
          <span>All</span>
        </label>
        <InputField value='Full-Time' title='Full-Time' name='workFilter' handleChange={handleChange} className="form-radio h-4 w-4 text-spark"/>
        <InputField value='Internship' title='Internship' name='workFilter' handleChange={handleChange} className="form-radio h-4 w-4 text-spark"/>
        
      </div>
    </div>
  );
};

export default Roles;
