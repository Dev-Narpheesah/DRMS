import React, { useState } from 'react';
import styles from './ResourceManagement.module.css';

const ResourceManagement = () => {
  const [resources, setResources] = useState([
    { id: 1, name: 'Water Bottles', quantity: 100 },
    { id: 2, name: 'Blankets', quantity: 200 },
  ]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addResource = () => {
    const newResource = {
      id: resources.length + 1,
      name,
      quantity: parseInt(quantity, 10),
    };
    setResources([...resources, newResource]);
    setName('');
    setQuantity('');
  };

  const deleteResource = (id) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  return (
    <div className={styles['resource-management']}>
      <h4 className={styles['resource-management__heading']}>Add New Resource</h4>
      <div className={styles['resource-management__form']}>
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          className={styles['resource-management__input']}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          className={styles['resource-management__input']}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className={styles['resource-management__add-btn']} onClick={addResource}>Add Resource</button>
      </div>
      <h4 className={styles['resource-management__heading']}>Resource List</h4>
      <ul className={styles['resource-management__list']}>
        {resources.map(resource => (
          <li key={resource.id} className={styles['resource-management__list-item']}>
            <span>{resource.name} (Quantity: {resource.quantity})</span>
            <button
              className={styles['resource-management__delete-btn']}
              onClick={() => deleteResource(resource.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceManagement;
