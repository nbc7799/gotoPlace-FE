import PlaceCard from './PlaceCard';

function LoadingView() {
  return <div className="bg-gray-100 p-8">맛집 소환중!</div>;
}

function ErrorView({ error }) {
  return <div className="bg-red-100 p-8">{error}</div>;
}

export default function ShowPlace({ loading, error, places }) {
  if (loading) return <LoadingView />;
  if (error) return <ErrorView />;
  if (!places) {
    return (
      <div className="bg-gray-50 p-8">
        <p>목록이 비었습니다</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {places.map((item, index) => (
        <PlaceCard key={index} item={item} />
      ))}
    </div>
  );
}
