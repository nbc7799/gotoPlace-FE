import Section from '@/components/Section';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/places')
      .then(response => {
        setPlaces(response.data.places);
        console.log(response.data.places);
      })
      .catch(err => {
        console.log('에러발생!', err);
      });
  }, []);

  if (loading) return;
  return (
    <div className="h-full w-full bg-blue-300">
      <Section title={'찜한 맛집'} />
      <Section title={'맛집 목록'} />
    </div>
  );
}
