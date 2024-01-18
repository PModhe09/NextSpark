import React from 'react';
import InputField from '../components/InputField';

const Experience = ({ handleChange  }) => {
  return (
    <div className="flex flex-col items-center">
  <h4 className='text-lg font-medium mb-3 text-left'>Experience Level</h4>
  <div className="text-left space-y-2">
    <InputField value='0-1' title='Fresher'  name='xpFilter' handleChange={handleChange} className="form-radio h-4 w-4 text-spark"/>
  



    <InputField value='1+' title='1+' name='xpFilter' handleChange={handleChange} className="form-radio h-4 w-4 text-spark"/>


  </div>
</div>

  );
};

export default Experience;
