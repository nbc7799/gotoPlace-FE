import PlaceCard from './PlaceCard';

export default function Section({ title, places }) {
  return (
    <section className="flex h-[30%] flex-col gap-5 p-8">
      <h2>{title}</h2>
      <div className="flex">
        {places.map((item, index) => {
          return <PlaceCard key={index} item={item} />;
        })}
      </div>
    </section>
  );
}
