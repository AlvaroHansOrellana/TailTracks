import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PaseosContext = createContext();

export const PaseosProvider = ({ children }) => {
  const [paseos, setPaseos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaseos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/paseos');
        setPaseos(response.data.walks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch walks');
        setLoading(false);
      }
    };

    fetchPaseos();
  }, []);

  return (
    <PaseosContext.Provider value={{ paseos, loading, error }}>
      {children}
    </PaseosContext.Provider>
  );
};

