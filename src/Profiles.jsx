// src/Profiles.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch profiles from local storage
    const storedProfiles = JSON.parse(localStorage.getItem('items')) || [];
    setProfiles(storedProfiles);
  }, []);

  return (
    <div>
      <h1>Profiles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <tr key={index}>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>{profile.phone}</td>
                <td>{profile.dob}</td>
                <td>{profile.address.city}, {profile.address.district}, Province {profile.address.province}, {profile.address.country}</td>
                <td>
                  {profile.profilePicture && <img src={profile.profilePicture} alt="Profile" width="100" />}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No profiles found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Profiles;
