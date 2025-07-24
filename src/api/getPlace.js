import axios from 'axios';
import { BASE_URL } from '../constants/baseURL';

export const getPlace = async (endpoint, setLoading, setPlaces) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    setPlaces(response.data.places);
    console.log(response.data.places);
  } catch (err) {
    console.error('에러발생!', err);
  } finally {
    setLoading(false);
  }
};
