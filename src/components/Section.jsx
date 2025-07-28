import ShowPlace from './ShowPlace';
import { useEffect, useState } from 'react';
import { getPlace } from '../api/getPlace';
import { useUserLocation } from '../hooks/useUserLocation';
import { sortPlacesByDistance } from '../utils/loc';

export default function Section({ title, endpoint }) {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState('');
  const { location, error: locError } = useUserLocation();
  const [isDefaultSort, setIsDefaultSort] = useState(true);

  useEffect(() => {
    const initPlace = getPlace(endpoint, setLoading, setPlaces, setError);
    setPlaces(initPlace);
    console.log('places', places);
    console.log('initPlace', initPlace.response);
  }, [endpoint]);

  const handleClickButton = () => {
    if (locError) return alert(locError);
    setIsDefaultSort(prev => !prev);
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
