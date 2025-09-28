import { useEffect } from "react";
import axios from "axios";

const InitialDataFetching = ({ source, setData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL; // from .env in frontend
        const response = await axios.get(`${API_URL}/api/${source}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, [source, setData]);

  return null; // This component doesn't render anything
};

export default InitialDataFetching;
