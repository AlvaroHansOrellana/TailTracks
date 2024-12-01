import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DogsContext = createContext();

export const DogsProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/perros');
        setDogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dogs');
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  return (
    <DogsContext.Provider value={{ dogs, loading, error }}>
      {children}
    </DogsContext.Provider>
  );
};

