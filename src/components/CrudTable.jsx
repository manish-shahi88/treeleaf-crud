import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const CrudTable = ({ data, onEdit, onDelete, searchQuery, setSearchQuery }) => {
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterByProvince, setFilterByProvince] = useState("");
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting function
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });
  }, [data, sortKey, sortOrder]);

  // Filtering and searching
  const filteredData = useMemo(() => {
    return sortedData.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterByProvince ? item.address.province === filterByProvince : true)
      );
    });
  }, [sortedData, searchQuery, filterByProvince]);

  const paginationData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleEdit = (index) => {
    onEdit(index); // Trigger the edit functionality
  };
  return (
    <div style={{background:"#FBF9F1"}} className="my-10 min-w-[95%] rounded-xl border p-10 flex flex-col gap-10 text-black">
      <div className="flex justify-end gap-5 ">
        <div>
          <label className="text-xl mr-2">Search:</label>
          <input
            className="rounded-md h-8 px-3 text-black shadow-md"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name"
          />
        </div>
        <div>
          <label className="text-xl mr-2">Filter by Province:</label>
          <select
          className="rounded-md h-8 px-3 text-black shadow-md"
            value={filterByProvince}
            onChange={(e) => setFilterByProvince(e.target.value)}
          >
            <option value="">All Provinces</option>
            {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Province {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="text-2xl text-start" onClick={() => handleSort("name")}>
              Name{" "}
              {sortKey === "name" ? (sortOrder === "asc" ? "🔼" : "🔽") : ""}
            </th>
            <th className="text-2xl text-start" onClick={() => handleSort("email")}>
              Email{" "}
              {sortKey === "email" ? (sortOrder === "asc" ? "🔼" : "🔽") : ""}
            </th>
            <th className="text-2xl text-start" onClick={() => handleSort("phone")}>
              Phone{" "}
              {sortKey === "phone" ? (sortOrder === "asc" ? "🔼" : "🔽") : ""}
            </th>
            <th className="text-2xl text-start" onClick={() => handleSort("dob")}>
              DOB {sortKey === "dob" ? (sortOrder === "asc" ? "🔼" : "🔽") : ""}
            </th>
            <th className="text-2xl text-start">Address</th>
            <th className="text-2xl text-start">Profile Picture</th>
            <th className="text-2xl text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginationData.map((item, index) => (
            <tr key={index}>
              <td className="pt-5 border-b">{item.name}</td>
              <td  className="pt-5 border-b">{item.email}</td>
              <td  className="pt-5 border-b">{item.phone}</td>
              <td  className="pt-5 border-b">{item.dob}</td>
              <td  className="pt-5 border-b">
                {item.address.city}, {item.address.district}, Province{" "}
                {item.address.province}, {item.address.country}
              </td>
              <td  className="pt-5 border-b">
                {item.profilePicture && (
                  <img src={item.profilePicture} alt="Profile" width="50" />
                )}
              </td>
              <td className="pt-5 border-b">
                <button className="mr-5 text-xl bg-green-700 p-1 rounded-full text-white" onClick={() => onEdit(index)}><MdEdit/></button>
                <button className="text-xl bg-red-700 p-1 rounded-full text-white" onClick={() => onDelete(index)}><MdDelete/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className="px-2 text-black"
              style={{
                backgroundColor:
                  currentPage === pageNumber ? "lightgray" : "white",
              }}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
      {/* <button className="bg-blue-100 text-black font-bold w-[300px] mx-auto px-4 py-2 rounded-md" onClick={() => navigate("/profiles")}>View All Profiles</button> */}
    </div>
  );
};

export default CrudTable;
