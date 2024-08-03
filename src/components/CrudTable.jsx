
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const CrudTable = ({ data, onEdit, onDelete, searchQuery, setSearchQuery }) => {
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterByProvince, setFilterByProvince] = useState('');
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting function
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });
  }, [data, sortKey, sortOrder]);

  // Filtering and searching
  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterByProvince ? item.address.province === filterByProvince : true);
    });
  }, [sortedData, searchQuery, filterByProvince]);

  const paginationData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <div>
        <label>Search:</label>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search by Name"
        />
      </div>
      <div>
        <label>Filter by Province:</label>
        <select 
          value={filterByProvince} 
          onChange={(e) => setFilterByProvince(e.target.value)}
        >
          <option value="">All Provinces</option>
          {Array.from({ length: 7 }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>Province {num}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortKey === 'name' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => handleSort('email')}>Email {sortKey === 'email' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => handleSort('phone')}>Phone {sortKey === 'phone' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => handleSort('dob')}>DOB {sortKey === 'dob' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}</th>
            <th>Address</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginationData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.dob}</td>
              <td>{item.address.city}, {item.address.district}, Province {item.address.province}, {item.address.country}</td>
              <td>
                {item.profilePicture && (
                  <img src={item.profilePicture} alt="Profile" width="50" />
                )}
              </td>
              <td>
                <button onClick={() => onEdit(index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            style={{ margin: '0 5px', backgroundColor: currentPage === pageNumber ? 'lightgray' : 'white' }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button onClick={() => navigate('/profiles')}>View All Profiles</button>
    </div>
  );
};

export default CrudTable;
