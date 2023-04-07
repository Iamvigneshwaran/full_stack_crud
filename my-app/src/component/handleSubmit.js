
 export const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { name, age };
    
    axios.put(`http://localhost:5000/users/${id}`, newUser)
      .then(res => {
        const updatedUsers = users.map(user => {
          if (user._id === res.data._id) {
            return res.data;
          }
          return user;
        });
        setUsers(updatedUsers);
        setName('');
        setAge('');
      })
      .catch(err => {
        console.error(err);
      });
  }
  