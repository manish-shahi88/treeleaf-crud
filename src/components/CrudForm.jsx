import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import validationSchema from "../validation/validationSchema";
import { toast } from "react-toastify";

const CrudForm = ({ onSubmit, currentData, onCancel, isUpdate }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const countryList = data.map((country) => country.name.common);
        setCountries(["Nepal", ...countryList]); // Nepal as default
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <Formik
      initialValues={{
        name: currentData?.name || "",
        email: currentData?.email || "",
        phone: currentData?.phone || "",
        dob: currentData?.dob || "",
        city: currentData?.address?.city || "",
        district: currentData?.address?.district || "",
        province: currentData?.address?.province || "",
        country: currentData?.address?.country || "Nepal",
        profilePicture: null,
      }}
      enableReinitialize // This is important to reinitialize the form
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit({
          ...values,
          address: {
            city: values.city,
            district: values.district,
            province: values.province,
            country: values.country,
          },
          profilePicture: values.profilePicture
            ? URL.createObjectURL(values.profilePicture)
            : null,
        });
        toast.success("Form submitted successfully!");
        resetForm();
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="relative flex flex-col gap-4 border border-white/30 min-w-[80%] px-10 py-10 mt-10 rounded-xl bg-white/20 backdrop-blur-sm shadow-xl text-black">
          <div className="flex flex-col md:flex-row justify-center gap-10 ">
            <div className=" flex-1">
              <label>Name:</label>
              <br />
              <Field
                className="rounded-md h-10 px-3 w-full"
                type="text"
                name="name"
              />
              <ErrorMessage
                className="text-red-400"
                name="name"
                component="p"
              />
            </div>
            <div className=" flex-1">
              <label>Email:</label>
              <br />
              <Field
                className="rounded-md h-10 px-3 w-full"
                type="email"
                name="email"
              />
              <ErrorMessage
                className="text-red-400"
                name="email"
                component="p"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-10 ">
            <div className="flex-1">
              <label>Phone Number:</label>
              <br />
              <Field
                className="rounded-md h-10 w-full px-3"
                type="text"
                name="phone"
              />
              <ErrorMessage
                className="text-red-400"
                name="phone"
                component="p"
              />
            </div>
            <div className="flex-1">
              <label>DOB:</label>
              <br />
              <Field
                className="rounded-md h-10 w-full px-3"
                type="date"
                name="dob"
              />
              <ErrorMessage className="text-red-400" name="dob" component="p" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-10 ">
            <div className="flex-1">
              <label>City:</label>
              <br />
              <Field
                className="rounded-md h-10 w-full px-3"
                type="text"
                name="city"
              />
              <ErrorMessage className="text-red-400" name="city" component="p" />
            </div>
            <div className="flex-1">
              <label>District:</label>
              <br />
              <Field
                className="rounded-md h-10 w-full px-3"
                type="text"
                name="district"
              />
              <ErrorMessage
                className="text-red-400"
                name="district"
                component="p"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-10 ">
            <div className="flex-1">
              <label>Province:</label>
              <br />
              <Field
                className="rounded-md h-10 w-full px-3"
                as="select"
                name="province"
              >
                <option value="">Select Province</option>
                {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    Province {num}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className="text-red-400"
                name="province"
                component="p"
              />
            </div>
            <div className="flex-1">
              <label>Country:</label>
              <br />
              <Field
                className="rounded-md h-10 w-full px-3 text-black"
                as="select"
                name="country"
              >
                {countries.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className="text-red-400"
                name="country"
                component="p"
              />
            </div>
          </div>
          
          <div>
            <label>Profile Picture:</label>
            <br />
            <input
              className="mt-1"
              type="file"
              onChange={(event) => {
                setFieldValue("profilePicture", event.currentTarget.files[0]);
              }}
            />
          </div>

          <div className="flex justify-center gap-5 mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {isUpdate ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CrudForm;
