import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    fullname: yup.string().min(3, 'Fullname must be at least 3 characters long').required('Fullname is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
})