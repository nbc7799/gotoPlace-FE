import { useEffect, useState } from 'react';

export const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(location);
      },
      error => {
        setError('위치 정보를 가져오는 데 실패했습니다.');
      },
    );
  }, []);

  return { location, error };
};
