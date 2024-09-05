export const API_URL = process.env.REACT_APP_API_URL;

console.log("API URL:", API_URL); // To verify the value is correctly loaded

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/your-endpoint`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
