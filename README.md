# ReactJS CRUD Application

## Description

This is a simple CRUD (Create, Read, Update, Delete) application built with ReactJS. The application allows users to manage a list of entries with the following fields:

- **Name**
- **Email**
- **Phone Number**
- **DOB (Date of Birth)**
- **Address:**
  - City
  - District
  - Province (1 to 7 options)
  - Country (default: Nepal, fetched from API)
- **Profile Picture** (uploadable)

## Features

- **Form Validation:** 
  - Required fields for Name, Email, and Phone Number
  - Email format validation
  - Phone Number must be numeric and at least 7 digits
  - Only `.png` images are accepted for the profile picture
  - Real-time validation with error and success labels

- **Data Management:**
  - Add multiple records
  - Edit and Delete records
  - Pagination in the table (up to 5 records per page)
  - Navigate to a "Profiles" page to view all records

- **Styling:** 
  - Styled with Tailwind CSS

- **Form Handling:**
  - Uses Formik for form management
  - Yup for validation schema

## Deployment

The application is deployed and available at:
- [Live Demo](https://treeleaf-crud-nu.vercel.app/)
  
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manish-shahi88/treeleaf-crud.git
