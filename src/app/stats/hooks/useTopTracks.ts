// hooks/useTopTracks.ts
import { useEffect, useState } from "react";
import { Track } from "../interfaces/interfaces";

export function useTopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/top-tracks", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data: Track[] = await res.json();
        setTracks(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading, error };
}
