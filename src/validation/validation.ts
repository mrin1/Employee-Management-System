import * as Yup from 'yup';

export const employeeValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Employee name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  department: Yup.string()
    .required('Please select a department'),
});