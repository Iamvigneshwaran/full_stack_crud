export const handleUpdate = (id, updatedUser) => {
  axios.put(`http://localhost:5000/users/${id}`, updatedUser)
    .then(res => {
      setUsers(users.map(user => user._id === id ? res.data : user));
      navigate(`/users/${id}`); // navigate to UserDetails component
    })
    .catch(err => {
      console.error(err);
    })
}
