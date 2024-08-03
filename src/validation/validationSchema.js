// src/validationSchema.js
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name must only contain letters and spaces').required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d+$/, 'Phone number must be only numbers')
    .min(7, 'Phone number must be at least 7 digits')
    .required('Phone number is required'),
  dob: Yup.date().required('DOB is required'),
  city: Yup.string().required('City is required'),
  district: Yup.string().required('District is required'),
  province: Yup.string().required('Province is required'),
  country: Yup.string().required('Country is required'),
  profilePicture: Yup.mixed()
    .test('fileType', 'Only PNG images are allowed', value => {
      if (!value) return false; // If no file is selected, return false
      return value.type === 'image/png'; // Check file type
    })
    .required('Profile picture is required')
});

export default validationSchema;
