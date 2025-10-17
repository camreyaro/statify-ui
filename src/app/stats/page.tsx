'use client'

import { useUser } from './hooks/useUser';
import TopArtists from './components/topArtists';
import TopTracks from './components/topTracks';
import TopTracksByArtist from './components/topTracksByArtist';

const Stats: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useUser();

  if (userLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (userError)
    return <p className="text-center mt-10 text-red-500"> {userError} </p>;

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* User Info */}
      {user && (
        <div className="flex flex-col items-center mb-10">
          <img
            src={user.photo}
            alt={user.name}
            className="w-32 h-32 rounded-full shadow-lg mb-4 object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
        </div>
      )}

      {/* Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl mb-12">
        <div>
          <TopTracks />
        </div>
        {/* Top Artists */}
        <div>
          <TopArtists />
        </div>
      </div>

      {/* Top Tracks By Artist */}
      <div className="w-full max-w-6xl space-y-8">
        <TopTracksByArtist />
      </div>
    </div >
  );
};

export default Stats;
