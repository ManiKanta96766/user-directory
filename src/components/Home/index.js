import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext'; // Assuming you have UserContext
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { userList } = useContext(UserContext);  // Get userList from context
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [filteredUsers, setFilteredUsers] = useState([]);  // State for filtered users
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const [usersPerPage] = useState(10);  // Number of users per page
  const [paginatedUsers, setPaginatedUsers] = useState([]);  // Subset of users to display
const navigate=useNavigate()
  // Sorting and filtering logic
  useEffect(() => {
    // Sort users alphabetically
    const sortedUsers = [...userList].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredUsers(sortedUsers);  // Set filtered users initially
  }, [userList]);

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);  // Update search query

    // Filter the users based on the search query
    const filtered = userList.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);  // Set filtered users based on search query
  };

  // Calculate total pages based on users and users per page
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Get the users for the current page
  const getPaginatedUsers = () => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  };

  // Change page when page number is clicked
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle user profile navigation
  const handleUserProfile = (id) => {
   navigate(`/user/${id}`)
  };

  // Update paginated users when the current page or search query changes
  useEffect(() => {
    setPaginatedUsers(getPaginatedUsers());
  }, [currentPage, filteredUsers]);

  return (
    <div>
      <h1>User Directory</h1>
      <input
        type="text"
        placeholder="Search users by name"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          padding: '8px',
          marginBottom: '20px',
          fontSize: '16px',
          width: '50%',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <table border="1" style={{ width: '50%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={index} onClick={() => handleUserProfile(user.id)}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}>
          Previous
        </button>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '0 5px',
              backgroundColor: currentPage === index + 1 ? '#4CAF50' : '',
              color: currentPage === index + 1 ? '#fff' : '',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
