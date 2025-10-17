import { useTopArtists } from '../hooks/useTopArtists';

const TopArtists: React.FC = () => {
  const { artists, loading: artistsLoading, error: artistsError } = useTopArtists();

  if (artistsLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (artistsError)
    return <p className="text-center mt-10 text-red-500">Error: {artistsError}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Top Artists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artists.map((artist, index) => (
              <div
                key={index}
                className="flex items-center bg-white shadow-md rounded-xl p-4 gap-4 hover:scale-105 transition-transform duration-200"
              >
                {artist.image_url && (
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-800">{artist.name}</p>
                </div>
              </div>
            ))}
          </div>
    </div>
  );
};

export default TopArtists;
