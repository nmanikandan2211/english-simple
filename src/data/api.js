import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/';

export const getSingleFiles = async () => {
  try {
    const { data } = await axios.get(apiUrl + 'getSingleFiles');
    return data;
  } catch (error) {
    throw error;
  }
}