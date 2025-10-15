'use client'

import { useUser } from './hooks/useUser';
import { useTopTracks } from './hooks/useTopTracks';
import { useTopArtists } from './hooks/useTopArtists';
import { useTopTracksByArtist } from './hooks/useTopTracksByArtist';

const Stats: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useUser();
  const { tracks, loading: tracksLoading, error: tracksError } = useTopTracks();
  const { artists, loading: artistsLoading, error: artistsError } = useTopArtists();
  const { tracksByArtist, loading: tracksByArtistLoading, error: tracksByArtistError } = useTopTracksByArtist();

  if (userLoading || tracksLoading || artistsLoading || tracksByArtistLoading)
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

  if (userError || tracksError || artistsError || tracksByArtistError)
    return <p className="text-center mt-10 text-red-500">
      {userError || tracksError || artistsError || tracksByArtistError}
    </p>;

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

      {/* Top Tracks & Artists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl mb-12">
        {/* Top Tracks */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Top Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tracks.map((track, index) => (
              <div
                key={index}
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

        {/* Top Artists */}
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
      </div>

      {/* Tracks By Artist */}
      <div className="w-full max-w-6xl space-y-8">
        {Object.entries(tracksByArtist).map(([artistName, trackList]) => (
          <div key={artistName}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{artistName}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(trackList || []).map((track, idx) => (
                <li
                  key={track.name}
                  className="flex items-center gap-3 bg-white shadow-sm rounded-lg p-3 hover:shadow-lg transition-shadow duration-200"
                >
                  {track.album_image_url && (
                    <img
                      src={track.album_image_url}
                      alt={track.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <span className="text-gray-800">{idx + 1}. {track.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
