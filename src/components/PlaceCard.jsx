import { BASE_URL } from '../constants/baseURL';

export default function PlaceCard({ item }) {
  return (
    <div className="h-[200px] w-[200px]">
      <img src={`${BASE_URL}/${item.image.src}`} alt={item.image.alt} />
      <h2 className="font-medium">{item.title}</h2>
    </div>
  );
}
