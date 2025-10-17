import { useTopTracksByArtist } from '../hooks/useTopTracksByArtist';

const TopTracksByArtist: React.FC = () => {
    const { tracksByArtist, loading: tracksByArtistLoading, error: tracksByArtistError } = useTopTracksByArtist();

    if (tracksByArtistLoading) {
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    }

    if (tracksByArtistError) {
        return <p className="text-center mt-10 text-red-500">Error: {tracksByArtistError}</p>;
    }

    return (
        <>
            {Object.entries(tracksByArtist).map(([artistId, artistInfo]) => (
                <div key={artistId} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">{artistInfo.name}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {(artistInfo.tracks || []).map((track, idx) => (
                            <li
                                key={track.id || track.name}
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
        </>
    );
};

export default TopTracksByArtist;
