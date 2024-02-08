import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RenderArrayCell = ({ array }) => {
  
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    
    const fetchTitle = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data.title;
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
    <ol style={{  padding: 0 }}>
      {titles.map((title, index) => (
        <li key={index}>{title}</li>
      ))}
    </ol>
  );
};
export default RenderArrayCell