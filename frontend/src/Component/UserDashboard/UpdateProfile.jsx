import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import styles from './UpdateProfile.module.css';

const UpdateProfile = ({ profile, setProfile }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [image, setImage] = useState(profile.image);
//   const history = useHistory();

  const handleUpdate = () => {
    setProfile({ name, email, image });
    alert('Profile updated!');
    // history.push('/');
  };

  return (
    <div className={styles.update-profile}>
      <h2>Update Profile</h2>
      <div className={styles.form-group}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={styles.form-group}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={styles.form-group}>
        <label htmlFor="image">Profile Image URL:</label>
        <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default UpdateProfile;
