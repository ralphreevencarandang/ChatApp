import React from 'react'
import { useField } from 'formik'
import { Lock, EyeOff, Eye } from 'lucide-react'
import { useState } from 'react'
const PasswordField = ({ ...props}) => {
        const [field, meta] = useField(props)
        const [showPassword, setShowPassword] =useState(false);
        
    
  return (
    <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Password</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="size-5 text-base-content/40 z-10" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="••••••••"
                     
                            {...field}
                            {...props}
                      
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="size-5 text-base-content/40" />
                            ) : (
                              <Eye className="size-5 text-base-content/40" />
                            )}
                          </button>
                        </div>
                    </div>
  )
}

export default PasswordField
