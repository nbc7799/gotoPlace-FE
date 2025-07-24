import PlaceCard from './PlaceCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/baseURL';

export default function Section({ title, endpoint }) {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${endpoint}`)
      .then(response => {
        setPlaces(response.data.places);
        console.log(response.data.places);
      })
      .catch(err => {
        console.log('에러발생!', err);
      });
    setLoading(false);
  }, []);

  if (loading) return <p>맛집 소환중!</p>;

  return (
    <section className="flex flex-col items-center gap-6 p-8">
      <h2>{title}</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {places.map((item, index) => {
          return <PlaceCard key={index} item={item} />;
        })}
      </div>
    </section>
  );
}
