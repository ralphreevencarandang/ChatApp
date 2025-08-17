import React from 'react'
import { useField } from 'formik'


const TextField = ({label, icon, ...props}) => {
    const [field, meta] = useField(props)

    // console.log('Field: ',field);
    // console.log('Meta: ',meta);
    
  return ( 
    <div className='form-control'>
        <label className='label'><span className='label-text font-medium'>{label}</span></label>
        <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            
                    {icon}
            </div>
            <input {...props} {...field} className={`input input-bordered w-full pl-10`} />
        </div>
    </div>
  )
}

export default TextField
