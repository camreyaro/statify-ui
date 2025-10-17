import { useTopTracks } from '../hooks/useTopTracks';

const TopTracks: React.FC = () => {
  const { tracks, loading: tracksLoading, error: tracksError } = useTopTracks();

  if (tracksLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (tracksError)
    return <p className="text-center mt-10 text-red-500">Error: {tracksError}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Top Tracks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tracks.map((track, index) => (
          <div
            key={track.id || index}
            className="flex items-center bg-white shadow-md rounded-xl p-4 gap-4 hover:scale-105 transition-transform duration-200"
          >
            {track.album_image_url && (
              <img
                src={track.album_image_url}
                alt={track.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex flex-col">
              <p className="font-semibold text-gray-800">{track.name}</p>
              <p className="text-gray-500 text-sm">{track.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTracks;
