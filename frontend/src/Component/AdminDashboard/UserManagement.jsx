import React, { useState } from 'react';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
    };
    setUsers([...users, newUser]);
    setName('');
    setEmail('');
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className={styles['user-management']}>
      <h4 className={styles['user-management__heading']}>Add New User</h4>
      <div className={styles['user-management__form']}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className={styles['user-management__input']}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={styles['user-management__input']}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles['user-management__add-btn']} onClick={addUser}>Add User</button>
      </div>
      <h4 className={styles['user-management__heading']}>User List</h4>
      <ul className={styles['user-management__list']}>
        {users.map(user => (
          <li key={user.id} className={styles['user-management__list-item']}>
            <span>{user.name} ({user.email})</span>
            <button
              className={styles['user-management__delete-btn']}
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
