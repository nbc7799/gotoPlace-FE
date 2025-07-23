import { BASE_URL } from '../constants/baseURL';

export default function PlaceCard({ item }) {
  return (
    <div className="aspect-[0.8] bg-stone-200">
      <img
        className="h-full w-full rounded-lg object-cover"
        src={`${BASE_URL}/${item.image.src}`}
        alt={item.image.alt}
      />
      <h2 className="text-lg">{item.title}</h2>
    </div>
  );
}
