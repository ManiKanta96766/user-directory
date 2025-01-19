import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userList } = useContext(UserContext); // Access context
  const user = userList.find((user) => user.id === parseInt(id, 10));

  if (!user) {
    return <p>User not found!</p>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p>
        <strong>Website:</strong>{' '}
        <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
          {user.website}
        </a>
      </p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default UserDetails;
