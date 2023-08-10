// src/components/PetList.js
import React, { useState, useEffect } from 'react';

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('/api/v1/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets', error));
  }, []);

  return (
    <div>
      <h1>Pet List</h1>
      <ul>
        {pets.map(pet => (
          <li key={pet.id}>{pet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
