import React from 'react';
import PlaceCard from './PlaceCard';

export default function Section({ title }) {
  return (
    <section className="flex flex-col gap-5 p-8">
      <h2>{title}</h2>
      <div className="flex">
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
      </div>
    </section>
  );
}
