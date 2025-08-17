import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    fullname: yup.string().min(3, 'Fullname must be at least 3 characters long').required('Fullname is required').trim('may spaces'),
    email: yup.string().email('Invalid email').required('Email is required').trim('may spaces'),
    password: yup.string().required('Password is required')
})