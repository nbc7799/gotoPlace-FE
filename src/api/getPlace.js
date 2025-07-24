import axios from 'axios';
import { BASE_URL } from '../constants/baseURL';

export const getPlace = async (endpoint, setLoading, setPlaces, setError) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    setPlaces(response.data.places);
    console.log(response.data.places);
  } catch (err) {
    console.error('에러발생!', err);
    setError('에러발생!');
  } finally {
    setLoading(false);
  }
};
