import axios from 'axios';
import { BASE_URL } from '../constants/baseURL';

//getPlace 비동기 함수로 endpoint를 매개변수로 받아 api 요청을 보낼 주소의 뒷부분으로 활용
export const getPlace = async endpoint => {
  try {
    //axios로 get요청보냄  기본 url에 뒤에 endpoint더해서 해당 데이터 return해줌
    // 즉 await써서 axios.get으로 데이터 다 불러올때까지 기다려주고 그리고 response 반환해!
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data.places;
  } catch (err) {
    //에러가 발생시 에러에 응답
    if (err.response) {
      const status = err.response.status;
      switch (status) {
        case 404:
          throw new Error('요청하신 리소스를 찾을 수 없습니다.(404)');
        case 500:
          throw new Error('서버에 문제가 발생했습니다. (500)');
        default:
          throw new Error(`에러발생! 상태코드: ${status}`);
      }
    } else {
      throw new Error('네트워크 오류 혹은 알 수 없는 에러 발생');
    }
  }
};
