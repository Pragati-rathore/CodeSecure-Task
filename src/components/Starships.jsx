import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StarShips = ({ array }) => {
  
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    
    const fetchTitle = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data.name;
      } catch (error) {
        console.error("Failed to fetch item details:", error);
        return "Failed to load";
      }
    };

    
    const fetchTitles = async () => {
      const fetchedTitles = await Promise.all(array.map(async (item) => await fetchTitle(item)));
      setTitles(fetchedTitles);
    };

    fetchTitles();
  }, [array]);


  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
        {titles.length > 0 ? 
      titles.map((title, index) => (
        
        <li key={index}>{title}</li>
      )): "Null"}
    </ul>
  );
};
export default StarShips;