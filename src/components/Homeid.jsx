import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeId = ({ array }) => {
  const [titles, setTitles] = useState();

  useEffect(() => {
    const fetchTitle = async (url) => {
      try {
        const response = await axios.get(url);
       
        setTitles(response.data.name);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch item details:", error);
        return "Failed to load";
      }
    };

    fetchTitle(array);
  }, []);

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      <li>{titles}</li>
    </ul>
  );
};
export default HomeId;
