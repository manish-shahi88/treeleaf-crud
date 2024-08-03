
// import { useState, useEffect } from 'react';

// const CrudForm = ({ onSubmit, currentData, onCancel }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [dob, setDob] = useState('');
//   const [city, setCity] = useState('');
//   const [district, setDistrict] = useState('');
//   const [province, setProvince] = useState('');
//   const [country, setCountry] = useState('Nepal');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [countries, setCountries] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch('https://restcountries.com/v3.1/all');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         const countryList = data.map(country => country.name.common);
//         setCountries(['Nepal', ...countryList]); // Nepal as default
//       } catch (error) {
//         console.error('Error fetching country data:', error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     if (currentData) {
//       setName(currentData.name);
//       setEmail(currentData.email);
//       setPhone(currentData.phone);
//       setDob(currentData.dob);
//       setCity(currentData.address.city);
//       setDistrict(currentData.address.district);
//       setProvince(currentData.address.province);
//       setCountry(currentData.address.country);
//       setProfilePicture(currentData.profilePicture);
//     }
//   }, [currentData]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!name) newErrors.name = 'Name is required';
//     if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
//     if (!phone || !/^\d{7,}$/.test(phone)) newErrors.phone = 'Phone number must be at least 7 digits';
//     // No need to check profile picture here
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSubmit({
//         name,
//         email,
//         phone,
//         dob,
//         address: { city, district, province, country },
//         profilePicture,
//       });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check if the file type is 'image/png'
//       if (file.type === 'image/png') {
//         // Create a URL for the image and set the profile picture
//         setProfilePicture(URL.createObjectURL(file));
//         // Clear any previous error
//         setErrors(prevErrors => ({ ...prevErrors, profilePicture: null }));
//       } else {
//         // Set error message if file is not a PNG image
//         setErrors(prevErrors => ({ ...prevErrors, profilePicture: 'Only PNG images are allowed' }));
//       }
//     } else {
//       // Set error message if no file is selected
//       setErrors(prevErrors => ({ ...prevErrors, profilePicture: 'Please select an image file' }));
//     }
//   };

//   const provinces = [];
//   for (let i = 1; i <= 7; i++) {
//     provinces.push(<option key={i} value={i}>Province {i}</option>);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         {errors.name && <p>{errors.name}</p>}
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         {errors.email && <p>{errors.email}</p>}
//       </div>
//       <div>
//         <label>Phone Number:</label>
//         <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//         {errors.phone && <p>{errors.phone}</p>}
//       </div>
//       <div>
//         <label>DOB:</label>
//         <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
//       </div>
//       <div>
//         <label>City:</label>
//         <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
//       </div>
//       <div>
//         <label>District:</label>
//         <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
//       </div>
//       <div>
//         <label>Province:</label>
//         <select value={province} onChange={(e) => setProvince(e.target.value)} required>
//           <option value="">Select Province</option>
//           {provinces}
//         </select>
//       </div>
//       <div>
//         <label>Country:</label>
//         <select value={country} onChange={(e) => setCountry(e.target.value)} required>
//           {countries.map((c, index) => (
//             <option key={index} value={c}>{c}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Profile Picture:</label>
//         <input type="file" accept="image/png" onChange={handleFileChange} />
//         {profilePicture && <img src={profilePicture} alt="Profile" width="100" />}
//         {errors.profilePicture && <p>{errors.profilePicture}</p>}
//       </div>
//       <button type="submit">Submit</button>
//       <button type="button" onClick={onCancel}>Cancel</button>
//     </form>
//   );
// };

// export default CrudForm;



// src/CrudForm.js
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import validationSchema from '../validation/validationSchema';


const CrudForm = ({ onSubmit, currentData, onCancel }) => {
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const countryList = data.map(country => country.name.common);
        setCountries(['Nepal', ...countryList]); // Nepal as default
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
    fetchCountries();
  }, []);
  
  return (
    <Formik
      initialValues={{
        name: currentData?.name || '',
        email: currentData?.email || '',
        phone: currentData?.phone || '',
        dob: currentData?.dob || '',
        city: currentData?.address?.city || '',
        district: currentData?.address?.district || '',
        province: currentData?.address?.province || '',
        country: currentData?.address?.country || 'Nepal',
        profilePicture: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission
        onSubmit({
          ...values,
          address: {
            city: values.city,
            district: values.district,
            province: values.province,
            country: values.country,
          },
          profilePicture: values.profilePicture ? URL.createObjectURL(values.profilePicture) : null,
        });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="p" />
          </div>
          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="p" />
          </div>
          <div>
            <label>Phone Number:</label>
            <Field type="text" name="phone" />
            <ErrorMessage name="phone" component="p" />
          </div>
          <div>
            <label>DOB:</label>
            <Field type="date" name="dob" />
            <ErrorMessage name="dob" component="p" />
          </div>
          <div>
            <label>City:</label>
            <Field type="text" name="city" />
            <ErrorMessage name="city" component="p" />
          </div>
          <div>
            <label>District:</label>
            <Field type="text" name="district" />
            <ErrorMessage name="district" component="p" />
          </div>
          <div>
            <label>Province:</label>
            <Field as="select" name="province">
              <option value="">Select Province</option>
              {Array.from({ length: 7 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>Province {num}</option>
              ))}
            </Field>
            <ErrorMessage name="province" component="p" />
          </div>
          <div>
            <label>Country:</label>
            <Field as="select" name="country">
              {countries.map((c, index) => (
                <option key={index} value={c}>{c}</option>
              ))}
            </Field>
            <ErrorMessage name="country" component="p" />
          </div>
          <div>
            <label>Profile Picture:</label>
            <input
              type="file"
              accept="image/png"
              onChange={(e) => setFieldValue('profilePicture', e.target.files[0])}
            />
            {values.profilePicture && values.profilePicture.type === 'image/png' && (
              <img src={URL.createObjectURL(values.profilePicture)} alt="Profile" width="100" />
            )}
            <ErrorMessage name="profilePicture" component="p" />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </Form>
      )}
    </Formik>
  );
};

export default CrudForm;
