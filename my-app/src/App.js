import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css';




const UserList = () => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [up, setup] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { id, name, age };
    
    axios.post('http://localhost:5000/users', newUser)
      .then(res => {
        setUsers([...users, res.data]);
        setId('');
        setName('');
        setAge('');
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(res => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleUpdate = (id, updatedUser) => {
      setup(updatedUser.data)
    console.log(updatedUser)
    axios.put(`http://localhost:5000/users/${id}`, updatedUser)
      .then(res => {
        setUsers(users.map(user => user._id === id ? res.data : user));
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getDataById = (id) => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <div className='main'>
      <>
        <h2 className='head'>User List</h2>
        <table className='table'>
          <thead className='subhead'>
            <tr>
              <th >ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {users.map(user => (
              <tr key={user._id}>
                <td className='id'>{user.id}</td>
                <td className='name'>{user.name}</td>
                <td className='age'>{user.age}</td>
                <td className='button'>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                  <button onClick={() => handleUpdate(user._id, { id, name, age })}>Update</button>
                  <button onClick={() => getDataById(user._id)}>Get Data</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

  

        <BrowserRouter>
          <Routes>
            <Route path='/user' element={<> 
              <form className='form' onSubmit={handleSubmit}>
                <label className='id'>
                  Id :
                  <input type="text" value={id} onChange={e => setId(e.target.value)} />
                </label> <br />
                <label className='name'>
                  Name:
                  <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label> <br />
                <label className='age'>
                  Age:
                  <input type="text" value={age} onChange={e => setAge(e.target.value)} />
                </label><br />
                <button className='button' type="submit">Add User</button>
              </form>
            </>} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default UserList;