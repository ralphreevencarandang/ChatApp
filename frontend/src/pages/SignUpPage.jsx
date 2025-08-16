
import {Formik, Form} from 'formik'
import {MessageSquare, User, Mail, EyeOff, Eye, Loader} from 'lucide-react'
import TextField from '../components/form/TextField'
import PasswordField from '../components/form/PasswordField'
import { signupSchema } from '../validation'
import {Link} from 'react-router'
import AuthImagePattern from '../components/AuthImagePattern'

const SignUpPage = () => {

 

  return (
    <section className='min-h-screen grid lg:grid-cols-2'>
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
          <div className='w-full max-w-md space-y-8'>
            {/* LOGO */}
            <div className='text-center mb-8'>
              <div className='flex flex-col items-center gap-2 group'>
                  <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    <MessageSquare className='size-6 text-primary'/>

                  </div>
                  <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                  <p className='text-base-content/60'>Get started with your free account</p>
              </div>
            </div>
            {/* FORM */}
            <Formik initialValues={{fullname: '', email: '', password: ''}} validationSchema={signupSchema}
              onSubmit={(values,actions)=>{
                console.log('Values: ', values);
                console.log('Actions: ', actions);
              
              }}
            >
                {(props)=>
                  <Form className='space-y-6'>
                    <TextField type='text' name='fullname' label={'Fullname'} icon={<User className='size-5 text-base-content/40 z-10'/>}/>
                    <TextField type='email' name='email' label={'Email'} icon={<Mail className='size-5 text-base-content/40 z-10'/>}/>
                   <PasswordField name='password'/>

                   <button type="submit" className='btn btn-primary w-full' disabled={props.isSubmitting}>{
                   props.isSubmitting ? <><Loader className='size-5 animate-spin'/> Creating...</> : 'Create Account'}</button> 
                  </Form>
                }
            </Formik>

            <div className='text-center'>
                <p className='text-base-content/60'>
                Already have am account? {" "} <Link to={'/login'} className='link link-primary'>Sign in </Link></p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <AuthImagePattern title={'Join our community'} subtitle={'Connect with friends, shate moments, and stay in touch with your loved ones.'}/>
      
    </section>
  )
}

export default SignUpPage
