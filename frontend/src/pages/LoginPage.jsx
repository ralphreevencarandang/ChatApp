import React from 'react'
import Loading from '../components/Loading'
import AuthImagePattern from '../components/AuthImagePattern'
import {MessageSquare, Mail} from 'lucide-react'
import { Link } from 'react-router'
import PasswordField from '../components/form/PasswordField'
import TextField from '../components/form/TextField'
import { Formik, Form } from 'formik'
import Button from '../components/form/Button'
import { loginOptions } from '../react-queries/authOptions'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({...loginOptions,
    onSuccess:()=>{
      navigate('/')
    }
  })
  return (
        <div className="h-screen grid lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
                transition-colors"
                >
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                <p className="text-base-content/60">Sign in to your account</p>
              </div>
            </div>

            <Formik initialValues={{email:'', password:''}} 
              onSubmit={(values, actions)=> {
                  console.log('Values: ', values);
                  console.log('Actions: ', actions);
                  loginMutation.mutate(values)
                  
            }}>
              {(props) => 
                <Form className="space-y-6">
                    <TextField label='Email' name='email' type='email' placeholder='example@email.com' icon={<Mail className='size-5 text-base-content/40 z-10'/>}/>
                    <PasswordField name='password'/>
                    <Button type='submit' label={loginMutation.isPending ? 'Loading...' : 'Login'} disabled={loginMutation.isPending}/>
                </Form>
              }
            </Formik>

          
            <div className="text-center">
              <p className="text-base-content/60">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="link link-primary">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

          {/* Right Side - Image/Pattern */}
          <AuthImagePattern
            title={"Welcome back!"}
            subtitle={"Sign in to continue your conversations and catch up with your messages."}
          />
      </div>
  )
}

export default LoginPage
