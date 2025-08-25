import React from 'react'

const Button = ({label, ...props}) => {
  return (
    <button {...props} className='btn btn-primary w-full'>
        {label}
    </button>
  )
}

export default Button
