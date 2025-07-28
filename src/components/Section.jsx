import ShowPlace from './ShowPlace';
import { useEffect, useState } from 'react';
import { getPlace } from '../api/getPlace';
import { useUserLocation } from '../hooks/useUserLocation';
import { sortPlacesByDistance } from '../utils/loc';

export default function Section({ title, endpoint }) {
  const [loading, setLoading] = useState(true);
  //실제 보여줄 장소 목록
  const [places, setPlaces] = useState([]);
  //초기 원본 장소 목록(정렬 전 상태 저장해두기 위함)
  const [originalPlaces, setOriginalPlaces] = useState([]);
  const [error, setError] = useState('');
  const { location, error: locError } = useUserLocation();
  // 현재 정렬 상태가 기본 순서인지 거리 순인지 관리
  const [isDefaultSort, setIsDefaultSort] = useState(false);

  // 컴포넌트가 처음 마운트되거나 endpoint가 바뀔 때 실행
  useEffect(() => {
    //비동기 함수 선언(api 호출 및 데이터 세팅)
    const initPlace = async () => {
      setLoading(true); // 로딩 시작
      try {
        //getPlace내부에서 비동기네트워크요청을 하고있어서 결과를 await로 기다려야한다.
        //그렇기에 자연스럽게 initPlace도 async함수가 되어야함
        const data = await getPlace(endpoint); // api에서 장소 데이터 가져오기
        setPlaces(data); // 화면에 보여줄 리스트 저장
        setOriginalPlaces(data); //원본 리스트도 따로 저장
      } catch {
        setError('에러다');
      } finally {
        setLoading(false);
      }
    };
    initPlace(); // 비동기 함수 호출
  }, [endpoint]);

  const handleClickButton = () => {
    if (locError) return locError;
    //정렬 상태를 반대로 전환하면서 로직 실행
    setIsDefaultSort(prev => {
      const next = !prev;
      if (next) {
        //거리순 정렬 수행
        const sorted = sortPlacesByDistance(
          places,
          location.latitude,
          location.longitude,
        );
        setPlaces(sorted); // 정렬된 리스트로 세팅
      } else {
        //원래대로 복원
        setPlaces(originalPlaces);
      }
      return next;
    });
  };

  return (
    <section className="flex flex-col items-center justify-between gap-6 p-8">
      <div className="flex w-full justify-between px-6">
        <h2>{title}</h2>
        <button
          onClick={() => handleClickButton()}
          className={`rounded-md px-4 py-2 transition-colors duration-200 ${
            isDefaultSort
              ? 'border border-gray-300 bg-gray-200 text-gray-800'
              : 'border border-red-500 bg-red-500 text-white'
          }`}
        >
          거리순 정렬
        </button>
      </div>
      <ShowPlace loading={loading} error={error} places={places} />
    </section>
  );
}
