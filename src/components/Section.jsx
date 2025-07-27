import PlaceCard from './PlaceCard';
import { useEffect, useState } from 'react';
import { getPlace } from '../api/getPlace';
import { useUserLocation } from '../hooks/useUserLocation';

function LoadingView() {
  return <div className="bg-gray-100 p-8">맛집 소환중!</div>;
}

function ErrorView({ error }) {
  return <div className="bg-red-100 p-8">{error}</div>;
}

export default function Section({ title, endpoint }) {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState('');
  const { location, error: locError } = useUserLocation();

  useEffect(() => {
    getPlace(endpoint, setLoading, setPlaces, setError);
  }, []);

  console.log(location);
  return (
    <section className="flex flex-col items-center gap-6 p-8">
      <h2>{title}</h2>

      {loading ? (
        LoadingView()
      ) : error ? (
        ErrorView()
      ) : places ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {places.map((item, index) => {
            return <PlaceCard key={index} item={item} />;
          })}
        </div>
      ) : (
        <div className="bg-gray-50 p-8">
          <p>목록이 비었습니다</p>
        </div>
      )}
    </section>
  );
}
