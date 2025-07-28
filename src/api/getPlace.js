import axios from 'axios';
import { BASE_URL } from '../constants/baseURL';

export const getPlace = async endpoint => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data.places;
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      switch (status) {
        case 404:
          throw new Error('요청하신 리소스를 찾을 수 없습니다.(404)');
          break;
        case 500:
          throw new Error('서버에 문제가 발생했습니다. (500)');
          break;
        default:
          throw new Error(`에러발생! 상태코드: ${status}`);
      }
    } else {
      throw new Error('네트워크 오류 혹은 알 수 없는 에러 발생');
    }
  }
};
