import React, { useEffect, useState } from "react";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faAndroid } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


const Species= ({ array }) => {
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
        {titles.length > 0 ?  (titles.map((title, index) => (
          <li key={index}>{title == "Droid" ? <FontAwesomeIcon icon={faAndroid} />: <FontAwesomeIcon icon={faUser} />}</li>
          
        ))) : <FontAwesomeIcon icon={faQuestionCircle} />}
       
      </ul>
    );
};
export default Species;
