import React from 'react'

const InputField = ({handleChange,value,title,name}) => {
  return (
    <label className='block relative pl-35 mb-12 cursor-pointer'>
      <input type='radio' name={name} value={value} onChange={handleChange}/>
      <span className='absolute top-0 left-0 h-20 w-20 bg-eee rounded-full'></span>{title}
    </label>
  )
}

export default InputField
