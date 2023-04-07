import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default UserDetails;
