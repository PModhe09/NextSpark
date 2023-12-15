import React from 'react';
import InputField from '../components/InputField';

const Experience = ({ handleChange  }) => {
  return (
    <div className="flex flex-col items-center">
      <h4 className='text-lg font-medium mb-2 text-left'>Experience Level</h4>
      <label className="text-left space-y-2 flex items-center cursor-pointer'">
        
        <InputField value='0-1' title='0-1' name='xpFilter' handleChange={handleChange} className="form-radio h-4 w-4 text-spark"/>
        <InputField value='1+' title='1+' name='xpFilter' handleChange={handleChange} className="form-radio h-4 w-4 text-spark"/>
      </label>
    </div>
  );
};

export default Experience;
